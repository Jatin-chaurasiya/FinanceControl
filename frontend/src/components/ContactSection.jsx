
const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-amber-100">
      <div className="container mx-auto px-4">

        {/* Section Heading */}
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          Contact Us
        </h2>

        <div className="flex flex-col lg:flex-row items-start gap-12">

          {/* Left Content */}
          <div className="lg:w-1/2">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              We’d Love to Hear From You
            </h3>

            <p className="text-gray-700 leading-relaxed">
              Whether you have questions, feedback, or feature suggestions,
              feel free to reach out.  
              We're here to help you manage your finances better, every day.
            </p>
          </div>

          {/* Right Form */}
          <div className="lg:w-1/2 bg-gray-50 p-6 rounded-xl shadow-md">
            <form className="space-y-5">

              {/* Name Field */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Message
                </label>
                <textarea
                  placeholder="Write your feedback or message..."
                  rows="4"
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 outline-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Send Message
              </button>

            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
