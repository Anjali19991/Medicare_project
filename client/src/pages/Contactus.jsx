import React from "react";

const ContactUs = () => {
  return (
    <div className="bg-teal-800 text-white min-h-30">
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-4">
          Contact Us - Your Medicare Partner
        </h1>

        <div className="flex flex-wrap -mx-4">
          <div className="w-full sm:w-1/2 px-4 mb-8">
            <h2 className="text-2xl font-semibold mb-4">How to Reach Us</h2>
            <p>
              <strong>Customer Support:</strong> <br />
              Phone: 999999999 <br />
              Email: medicate@gmail.com <br />
            </p>
          </div>

          <div className="w-full sm:w-1/2 px-4 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Visit Us</h2>
            <p>
              <strong>Location:</strong> At sun below star <br />
              <strong>Business Hours:</strong> 9:00am to 9:00pm
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Connect on Social Media
          </h2>
          <p>
            Follow us on <a href="#">Facebook</a> ,<a href="#">Instagram</a> for
            updates, health tips, and community events.
            <br />
            Direct message us on social media for quick responses to your
            inquiries.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Services We Offer</h2>
          <ul>
            <li>Pharmacy Services</li>
            <li>Doctor Appointments</li>
            <li>Medicine Purchase</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Feedback and Suggestions
          </h2>
          <p>
            We value your feedback! If you have any suggestions, concerns, or
            compliments, please reach out to us through our{" "}
            <a className="underline" href="[Link to Feedback Form]">
              Feedback Form
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
