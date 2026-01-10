
TEMPLATE_CONFIG = {
    "air_rod_to_tape-cable_coupling.astro.j2": {
        "name": "Lightning products comparison page (images and text, raychem- description images, speedwell-text description)",
        "structure": [
            {"key": "title", "label": "Title", "type": "text"},
            {"key": "raychem.tech_details", "label": "Raychem Tech Details Image", "type": "image"},
            {
                "key": "raychem.images",
                "label": "Raychem Images",
                "type": "list",
                "item_schema": {"type": "image", "label": "Image"}
            },
            {
                "key": "raychem.spec",
                "label": "Raychem Spec Images",
                "type": "list",
                "item_schema": {"type": "image", "label": "Image"}
            },
            {
                "key": "speedwell.images",
                "label": "Speedwell Images",
                "type": "list",
                "item_schema": {"type": "image", "label": "Image"}
            },
            {
                "key": "speedwell.spec",
                "label": "Speedwell Spec Images",
                "type": "list",
                "item_schema": {"type": "image", "label": "Image"}
            },
            {
                "key": "speedwell.description",
                "label": "Speedwell Description",
                "type": "list",
                "item_schema": {"type": "text", "label": "Description Line"}
            },
        ]
    },
    "aluminium-cleats.astro.j2": {
        "name": "Product card grid page (to show subcategories of products)",
        "structure": [
            {"key": "page_heading", "label": "Page Heading", "type": "text"},
            {
                "key": "products",
                "label": "Products",
                "type": "list",
                "item_schema": {
                    "type": "object",
                    "fields": [
                        {"key": "name", "label": "Name", "type": "text"},
                        {"key": "description", "label": "Description", "type": "text"},
                        {"key": "image_url", "label": "Image", "type": "image"},
                        {"key": "target_page", "label": "Target Page", "type": "text"},
                    ]
                }
            }
        ]
    },
    "bw-industrial-cable-gland.astro.j2": {
        "name": "Comparison of two products (images only)",
        "structure": [
            {"key": "title", "label": "Product Title", "type": "text"},
            {
                "key": "raychem.images",
                "label": "Raychem Images",
                "type": "list",
                "item_schema": {"type": "image", "label": "Image"}
            },
            {
                "key": "raychem.tech_details",
                "label": "Raychem Tech Details Images",
                "type": "list",
                "item_schema": {"type": "image", "label": "Image"}
            },
            {
                "key": "raychem.spec",
                "label": "Raychem Spec Images",
                "type": "list",
                "item_schema": {"type": "image", "label": "Image"}
            },
            {
                "key": "speedwell.images",
                "label": "Speedwell Images",
                "type": "list",
                "item_schema": {"type": "image", "label": "Image"}
            },
            {
                "key": "speedwell.tech_details",
                "label": "Speedwell Tech Details Images",
                "type": "list",
                "item_schema": {"type": "image", "label": "Image"}
            },
            {
                "key": "speedwell.spec",
                "label": "Speedwell Spec Images",
                "type": "list",
                "item_schema": {"type": "image", "label": "Image"}
            },
        ]
    },
    "cable-ties-coated.astro.j2": {
        "name": "Induvidual product page (images only)",
        "structure": [
            {"key": "title", "label": "Title", "type": "text"},
            {"key": "description", "label": "Description", "type": "text"},
            {"key": "tech_data_image", "label": "Technical Data Image", "type": "image"},
            {
                "key": "images",
                "label": "Product Images",
                "type": "list",
                "item_schema": {"type": "image", "label": "Image"}
            },
            {
                "key": "table_images",
                "label": "Table Images",
                "type": "list",
                "item_schema": {"type": "image", "label": "Image"}
            },
        ]
    },
    "caution-spotlight-fittings-v2.astro.j2": {
        "name": "Warom products comparison page (side-by-side view with tables)",
        "structure": [
            {"key": "title", "label": "Title", "type": "text"},
            {"key": "description", "label": "Description", "type": "text"},
            {"key": "product_image", "label": "Product Image", "type": "image"},
            {"key": "diagram_image", "label": "Diagram Image", "type": "image"},
            {
                "key": "data_table_rows",
                "label": "Data Table Rows",
                "type": "list",
                "item_schema": {
                    "type": "object",
                    "fields": [
                        {"key": "label", "label": "Label", "type": "text"},
                        {"key": "value", "label": "Value", "type": "text"},
                    ]
                }
            },
            {
                "key": "spec_table_rows",
                "label": "Spec Table Rows",
                "type": "list",
                "item_schema": {
                    "type": "object",
                    "fields": [
                        {"key": "label", "label": "Label", "type": "text"},
                        {"key": "value", "label": "Value", "type": "text"},
                        {"key": "is_ex_rating", "label": "Is Ex Rating", "type": "checkbox"},
                    ]
                }
            }
        ]
    },
    "wall-mounted-receptacles.astro.j2": {
        "name": "Comparison of two products with detailed part numbers and corresponding tables",
        "structure": [
            {"key": "page_heading", "label": "Page Heading", "type": "text"},
            {
                "key": "product_groups",
                "label": "Product Groups",
                "type": "list",
                "item_schema": {
                    "type": "object",
                    "fields": [
                        {"key": "title", "label": "Group Title", "type": "text"},
                        {
                            "key": "description",
                            "label": "Description Lines",
                            "type": "list",
                            "item_schema": {"type": "text", "label": "Line"}
                        },
                        {
                            "key": "images",
                            "label": "Images",
                            "type": "list",
                            "item_schema": {"type": "image", "label": "Image"}
                        },
                        {
                            "key": "variants",
                            "label": "Variants",
                            "type": "list",
                            "item_schema": {
                                "type": "object",
                                "fields": [
                                    {"key": "protectionType", "label": "Protection Type", "type": "text"},
                                    {"key": "ratingAmp", "label": "Rating Amp", "type": "text"},
                                    {"key": "poles", "label": "Poles", "type": "text"},
                                    {"key": "partNo230V", "label": "Part No 230V", "type": "text"},
                                    {"key": "partNo400V", "label": "Part No 400V", "type": "text"},
                                    {"key": "pdf_link", "label": "PDF Link", "type": "file"},
                                ]
                            }
                        }
                    ]
                }
            }
        ]
    }
}
