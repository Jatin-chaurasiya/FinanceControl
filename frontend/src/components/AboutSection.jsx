import { Heading, Heading1 } from "lucide-react";
import aboutImg from "../assets/about-img.png"; // rename your image & place in assets folder

const AboutSection = () => {
  return (
    <section id="about" className="py-20  bg-[#92e0ff]">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-12 text-center text-5xl">
          About
        </h1>
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Take Control of Your Financial OperationsTake Control of Your Finances
            </h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              Built for modern organizations, this system enables both users and administrators to manage finances efficiently. Users can securely log in, record daily income and expenses, and track their financial activities with ease.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Administrators gain full control with advanced capabilities—monitor all user transactions, apply filters, update or delete records, and manage user access with actions like ban or unban. With centralized oversight and automated processes, your organization stays financially organized, transparent, and in control.
            </p>
          </div>

          {/* Right Image */}
          <div className="lg:w-1/2 flex justify-center">
            <img
              src={aboutImg}
              alt="About Monetrix"
              className="w-full max-w-md drop-shadow-xl rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
