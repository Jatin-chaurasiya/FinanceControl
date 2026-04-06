import { Heading, Heading1 } from "lucide-react";
import aboutImg from "../assets/about-img.png"; // rename your image & place in assets folder

const AboutSection = () => {
  return (
    <section id="about" className="py-20  bg-amber-100">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-12 text-center text-5xl">
          About
        </h1>
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Take Control of Your Finances
            </h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              Your foundation for secure, intelligent financial management.
              Effortlessly track your income and expenses to achieve your
              financial goals with clarity and confidence.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Users can simply log in or sign up, add their daily income or
              expenses, and we’ll handle the rest. Enjoy automated daily
              reminders straight to your email—helping you stay consistent,
              aware, and always in control of your money.
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
