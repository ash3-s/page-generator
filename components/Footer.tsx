const Footer = () => {
  return (
    <footer className="w-full bg-slate-50 mt-10">
      <div className="flex flex-col gap-6 lg:px-25 lg:pt-2 px-5">
        {/* Logo */}


        <div className="lg:flex justify-around gap-8">
          {/* Deltric Sdn Bhd */}
          <div className="mb-2 flex-1">
            <div className="flex justify-center mb-2">
              <h3 className="text-2xl lg:text-3xl font-bold text-brand-color">Deltric Sdn Bhd &#40;Products&#41;</h3>
            </div>
            <div className="flex flex-col md:flex-row gap-4 h-auto my-2">
              <div className="text-slate-600 text-sm space-y-0.5 w-full lg:max-w-60 md:w-auto md:max-w-xs ">
                <div className="flex items-center gap-2 mb-2 font-semibold text-slate-900">
                  <img src="/location.svg" alt="map" className="w-5 h-5" />
                  <span>Address</span>
                </div>
                <p>No.11, Jalan TPP 1/1,</p>
                <p>Taman Industri</p>
                <p>Puchong,</p>
                <p>47100, Puchong , Selangor, Malaysia</p>
                <p className="pt-1">Phone: <b>+60 0162113548</b></p>
              </div>
              <div className="w-86 h-32 shadow-md rounded-lg overflow-hidden">
                <iframe
                  className="w-full h-full"
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://maps.google.com/maps?q=DELTRIC SDN BHD  No.11, Jalan TPP 1/1,  Taman Industri  Puchong,  47100, Puchong , Selangor&t=&z=15&ie=UTF8&iwloc=B&output=embed"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Deltric Holdings */}
          <div className="mb-2 flex-1">
            <div className="flex justify-center mb-0">
              <h3 className="text-2xl lg:text-3xl font-bold text-brand-color">Deltric Holdings Sdn Bhd &#40;Services&#41;</h3>
            </div>
            <div className="flex flex-col md:flex-row gap-4 h-auto my-2">
              <div className="text-slate-600 text-sm space-y-0.5 w-full md:w-auto md:max-w-sm lg:max-w-60">
                <div className="flex items-center gap-2 mb-2 font-semibold text-slate-900">
                  <img src="/location.svg" alt="map" className="w-5 h-5" />
                  <span>Address</span>
                </div>
                <p>No. 36-1,</p>
                <p>Pusat Perdagangan One Puchong, Jalan OP 1/5,</p>
                <p>Off, Jalan Puchong, Bandar Jaya,</p>
                <p>47160, Puchong, Selangor, Malaysia</p>
                <p className="pt-1">Phone: <b>+60 0162113548</b></p>
              </div>
              <div className="w-86 h-32 shadow-md rounded-lg overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15936.807906718086!2d101.61886!3d3.040457!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc4b427c2eb235%3A0xcca0e297de3a4ac2!2sDeltric%20Holdings%20Sdn%20Bhd!5e0!3m2!1sen!2sus!4v1763735033834!5m2!1sen!2sus"
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-2">
        <h3 className="font-semibold text-slate-900 mb-3 text-center">Follow Us On</h3>
        <div className="flex gap-4 justify-center">
          <a
            href="#"
            className="text-blue-600 hover:text-blue-700 transition-colors"
            aria-label="LinkedIn"
          >
            <img
              src="/linkedin.svg"
              alt="linkedin"
              className="w-6 h-6 cursor-pointer"
            />
          </a>
          <a
            href="#"
            className="text-blue-600 hover:text-blue-700 transition-colors"
            aria-label="Facebook"
          >
            <img
              src="/facebook.svg"
              alt="facebook"
              className="w-6 h-6 cursor-pointer"
            />
          </a>
          <a
            href="#"
            className="text-red-600 hover:text-red-700 transition-colors"
            aria-label="YouTube"
          >
            <img
              src="/youtube.svg"
              alt="youtube"
              className="w-6 h-6 cursor-pointer"
            />
          </a>
          <a
            href="#"
            className="text-pink-600 hover:text-pink-700 transition-colors"
            aria-label="Instagram"
          >
            <img
              src="/instagram.svg"
              alt="instagram"
              className="w-6 h-6 cursor-pointer"
            />
          </a>
          <a
            href="#"
            className="text-green-600 hover:text-green-700 transition-colors"
            aria-label="WhatsApp"
          >
            <img
              src="/whatsapp.svg"
              alt="whatsapp"
              className="w-6 h-6 cursor-pointer"
            />
          </a>
        </div>
      </div>
      <div className="p-5">
        <p className="text-center text-slate-600 text-sm">
          © 2025 Deltric All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;