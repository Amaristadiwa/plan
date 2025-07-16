import React, { useState } from "react";

const faqData = [
  {
    question: "What is Wedding Bells?",
    answer:
      "Wedding Bells is an all-in-one wedding planning app that helps couples and planners organize weddings easily — from budgeting to guest management.",
  },
  {
    question: "Is it free to use?",
    answer:
      "Yes! Wedding Bells offers free features for couples. Wedding planners can also access premium tools with a pro account.",
  },
  {
    question: "Can I invite my partner to help plan?",
    answer:
      "Absolutely! You and your partner can collaborate on every step together in real time.",
  },
  {
    question: "Can I book venues directly through the app?",
    answer:
      "Yes, we partner with trusted venues that you can view, filter, and book directly inside the app.",
  },
];

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center py-20 px-4 sm:px-10"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/736x/dd/21/7d/dd217d39237d319187fbc48ab4d0fac8.jpg')",
      }}
    >
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md p-10 rounded-2xl shadow-2xl">
        <h2 className="text-4xl sm:text-5xl font-bold text-center text-pink-500 mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className={`rounded-xl transition-all duration-300 border ${
                openIndex === index
                  ? "bg-pink-50 border-pink-300"
                  : "bg-white border-gray-200"
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-5 py-4 text-left"
              >
                <span className="font-semibold text-blue-900 text-lg sm:text-xl">
                  {faq.question}
                </span>
                <span className="text-pink-500 text-2xl font-bold">
                  {openIndex === index ? "-" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-5 pb-5 text-gray-700 text-base sm:text-lg">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


