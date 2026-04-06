import { Instagram, Facebook, Linkedin } from "lucide-react";
import { assets } from "../assets/assets";

const FooterSection = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4">

        <div className="flex flex-col md:flex-row justify-between gap-10">

          {/* Logo + Quote */}
          <div className="md:w-1/3">
            <div className="flex items-center gap-3 mb-4">
              <img src={assets.logo} alt="Monetrix Logo" className="h-12 w-12" />
              <span className="text-2xl font-bold text-white">Monetrix</span>
            </div>
            <p className="text-gray-400 italic">
              "Small steps today build the financial freedom of tomorrow."
            </p>
          </div>

          {/* Footer Links */}
          <div className="md:w-1/3 flex flex-col gap-2">
            <h3 className="text-lg font-semibold text-white mb-2">Quick Links</h3>
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Use</a>
            <a href="#" className="hover:text-white transition">Community</a>
          </div>

          {/* Social Links */}
          <div className="md:w-1/3">
            <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="hover:text-white transition"
                aria-label="Instagram"
              >
                <Instagram size={26}/>
              </a>
              <a
                href="#"
                className="hover:text-white transition"
                aria-label="Facebook"
              >
                <Facebook size={28} />
              </a>
              <a
                href="#"
                className="hover:text-white transition"
                aria-label="LinkedIn"
              >
                <Linkedin size={28} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Monetrix — All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-1">
            Made with ❤️ by <span className="text-white font-semibold">Jatin Chaurasiya</span>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default FooterSection;
