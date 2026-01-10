import os
import json
from flask import Flask, render_template, request, jsonify, send_file
from jinja2 import Environment, FileSystemLoader

from template_config import TEMPLATE_CONFIG

app = Flask(__name__, template_folder='flask_templates')
app.config['UPLOAD_FOLDER'] = 'static/uploads'
app.config['OUTPUT_FOLDER'] = 'output'
app.config['TEMPLATES_FOLDER'] = 'templates'

# Ensure directories exist
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
os.makedirs(app.config['OUTPUT_FOLDER'], exist_ok=True)
os.makedirs(app.template_folder, exist_ok=True) # Ensure flask templates dir exists

# Setup Jinja2 env for the Astro templates (separate from Flask's templates)
astro_env = Environment(loader=FileSystemLoader(app.config['TEMPLATES_FOLDER']))

@app.route('/')
def index():
    return render_template('index.html', templates=TEMPLATE_CONFIG)

@app.route('/template/<filename>')
def template_form(filename):
    config = TEMPLATE_CONFIG.get(filename)
    if not config:
        return "Template not found", 404
    return render_template('form.html', filename=filename, config=config)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    # Save file
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(filepath)
    
    # Return relative path for use in template
    # Assuming the astro files are in the root or headers set paths correctly, 
    # but usually we want a path relative to the final project structure.
    # For now, let's return the absolute path or a relative path that works.
    # The templates seem to use imports like `import img from "{{ img }}"`.
    # If the user is running this generator locally to create files for a codebase,
    # they probably want the images in a specific location in that codebase.
    # However, since this is a "generator app", we'll just return the local static path
    # and the user can move files later, OR we just use the path as is for now.
    
    # Better: return the filename, and let the frontend/template decide how to prefix it.
    # But for "preview" or valid code generation, we might need a relative path import.
    # Let's return the full path for now as the templates blindly import what we give.
    
    # Actually, imports in Astro/Vite usually need relative paths (./...) or aliases.
    # If we generate a file in `output/generated.astro`, and image is in `static/uploads/img.jpg`,
    # the relative path is `../static/uploads/img.jpg`.
    # Let's simple return the absolute path for simplicity in this local tool.
    
    # Return path relative to the final project structure as requested.
    # The user wants imports to look like: import img from "../../../../assets/filename"
    
    project_asset_path = f"../../../../assets/{file.filename}"
    return jsonify({'url': project_asset_path, 'filename': file.filename})

@app.route('/generate', methods=['POST'])
def generate():
    data = request.json
    filename = data.get('template_filename')
    form_data = data.get('formData')
    
    # Helper to clean up paths if they are absolute local paths (e.g. from cached frontend state)
    def clean_paths(obj, key=None):
        if isinstance(obj, dict):
            return {k: clean_paths(v, k) for k, v in obj.items()}
        elif isinstance(obj, list):
            return [clean_paths(v, key) for v in obj]
        elif isinstance(obj, str):
            # Check for upload paths or existing asset paths that might need correction
            if '/static/uploads/' in obj or (os.path.isabs(obj) and 'uploads' in obj) or 'assets/' in obj:
                base = os.path.basename(obj)
                
                # Special handling for specific templates
                if filename == 'wall-mounted-receptacles.astro.j2':
                    if base.lower().endswith('.pdf'):
                        return f"../../../../assets/Mennekes/[category]/{base}"
                    else:
                        return f"../../../../assets/Mennekes Pictures/{base}"
                
                # Special handling for caution spotlight v2 (assumed 1 level shallower)
                if filename == 'caution-spotlight-fittings-v2.astro.j2':
                    return f"../../../assets/{base}"
                
                # Special handling for air rod to tape coupling
                if filename == 'air_rod_to_tape-cable_coupling.astro.j2':
                    if key and 'speedwell' in key:
                         return f"../../../assets/Lightning/files/{base}"
                    return f"../../../assets/Lightning/{base}"
                
                return f"../../../../assets/{base}"
            return obj
        return obj

    # Helper to unflatten dot-notation keys
    def unflatten(dictionary):
        result = {}
        for key, value in dictionary.items():
            parts = key.split('.')
            d = result
            for part in parts[:-1]:
                if part not in d:
                    d[part] = {}
                d = d[part]
            d[parts[-1]] = value
        return result

    if form_data:
        form_data = clean_paths(form_data)
        form_data = unflatten(form_data)
    
    if not filename or not form_data:
        return jsonify({'error': 'Missing data'}), 400
        
    try:
        template = astro_env.get_template(filename)
        rendered_content = template.render(**form_data)
        
        output_filename = filename.replace('.j2', '')
        output_path = os.path.join(app.config['OUTPUT_FOLDER'], output_filename)
        
        with open(output_path, 'w') as f:
            f.write(rendered_content)
            
        return jsonify({'success': True, 'downloadUrl': f'/download/{output_filename}'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/download/<filename>')
def download(filename):
    return send_file(os.path.join(app.config['OUTPUT_FOLDER'], filename), as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
