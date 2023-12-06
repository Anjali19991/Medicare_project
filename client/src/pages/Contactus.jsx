import React, { useState } from 'react';

const ContactUsPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userName, setUserName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleContactClick = () => {
    window.scrollTo({
        top: 320,
        behavior: 'smooth'
      });
    setShowForm(true);
   
  };

  const handleBackToHome = () => {
    setShowForm(false);
    setIsSubmitted(false);
  };

  return (
    <div
      className="min-h-screen pb-96 flex flex-col justify-center items-center "
    >
      {/* <img src="https://mondial.com.ph/wp-content/uploads/2020/02/contact-header.jpg" alt="" className='w-screen -mt-16' /> */}
      <div className={"bg-white mt-16 p-8 ${showForm?'rounded-lg shadow-md max-w-lg':'max-w-lg'} w-full max-w-lg"}>
        {!showForm ? (
          <>
            <h2 className="text-4xl font-bold text-teal-500 mb-6">Medicare</h2>
            <section className="text-gray-700 mb-6">
              <p className="mb-4">Providing healthcare services at your fingertips.</p>
              <p>Contact us for any inquiries or support.</p>
            </section>
            <button
              onClick={handleContactClick}
              className="bg-teal-500 text-white p-2 rounded-md hover:bg-teal-600 focus:outline-none focus:ring focus:border-teal-300"
            >
              Contact Us
            </button>
          </>
        ) : (
          <>
            {isSubmitted ? (
              <div>
                <p className="text-teal-500 text-2xl mb-4">
                  Hi {userName}, we received your query!
                </p>
                <p>We will get back to you soon. Thank you!</p>
                <button
                  onClick={handleBackToHome}
                  className="mt-4 bg-teal-500 text-white p-2 rounded-md hover:bg-teal-600 focus:outline-none focus:ring focus:border-teal-300"
                >
                  Back to Home
                </button>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-teal-500"
                    placeholder="John Doe"
                    onChange={(e) => setUserName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-teal-500"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-teal-500"
                    placeholder="Type your message here..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-teal-500 text-white p-2 rounded-md hover:bg-teal-600 focus:outline-none focus:ring focus:border-teal-300"
                >
                  Submit
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ContactUsPage;