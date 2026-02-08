'use client';

import Link from 'next/link';
import { useState } from 'react';

const faqs = [
  {
    question: 'Can I cancel or pause my account?',
    answer: 'Yes, you can cancel or pause your account at any time. If you temporarily pause your account you will be able to turn it back on at any time and resume your campaign immediately.',
  },
  {
    question: 'How long does it take for my order to deliver?',
    answer: 'Delivery times depend on your location and shipping method. Typically, orders arrive within 5-7 business days.',
  },
  {
    question: 'How many days is the replacement/ return policy?',
    answer: 'Our replacement or return policy is 30 days from the date of delivery.',
  },
  {
    question: 'Can I cancel or change the order after placing it?',
    answer: 'Yes, you can modify or cancel your order within 24 hours of placing it.',
  },
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="container">
        <div className="faq-left">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${activeIndex === index ? 'active' : ''}`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="faq-question">
                {faq.question}
                <span className="arrow">{activeIndex === index ? '▲' : '▼'}</span>
              </div>
              {activeIndex === index && <p className="faq-answer">{faq.answer}</p>}
            </div>
          ))}
        </div>

        <div className="faq-right">
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <p className="faq-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam mauris augue, aliquam ac rhoncus id, tristique at augue. Duis vel luctus odio, sed sagittis urna. Integer at elit at leo varius vestibulum.
          </p>
          <div className="strokeBtn-wrapper">
            <Link href='/faq' className="strokeBtn">More FAQ</Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .faq-section {
          padding: 100px 20px;
          background: #fff;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          gap: 80px;
        }

        /* Left Column - FAQ */
        .faq-left {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .faq-item {
          background: #f9f4f2;
          padding: 20px 25px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .faq-item.active {
          background: #ece2de;
        }

        .faq-question {
          font-weight: 500;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .faq-answer {
          margin-top: 12px;
          font-size: 14px;
          color: #555;
        }

        .arrow {
          font-size: 14px;
        }

        /* Right Column - Title & Button */
        .faq-right {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 25px;
          text-align: left;
        }

        .faq-title {
          font-family: 'Brush Script MT', cursive;
          font-size: 48px;
          color: #c9a9a0;
        }

        .faq-description {
          font-size: 14px;
          color: #555;
        }

        .more-faq-btn {
          padding: 12px 40px;
          border: 1px solid #000;
          background: transparent;
          border-radius: 30px;
          cursor: pointer;
          font-size: 14px;
          align-self: start;
        }

        .strokeBtn-wrapper {
          display: inline-block;
          margin-top: 1rem;
        }

        .strokeBtn-wrapper :global(a) {
          position: relative;
          background: transparent;
          border: none;
          padding: 12px 36px;
          font-size: 1.1rem;
          cursor: pointer;
          color: #333;
          font-family: inherit;
          display: inline-block;
          width: fit-content;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .strokeBtn-wrapper :global(a)::before {
          content: "";
          position: absolute;
          inset: -5px;
          border: 2px solid rgba(0, 0, 0, 0.35);
          border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
          transform: rotate(-3deg);
          transition: all 0.3s ease;
          pointer-events: none;
        }

        .strokeBtn-wrapper :global(a):hover {
          color: #000;
        }

        .strokeBtn-wrapper :global(a):hover::before {
          transform: rotate(2deg) scale(1.05);
          border-color: rgba(0, 0, 0, 0.6);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .faq-title {
            font-size: 40px;
          }
        }

        @media (max-width: 768px) {
          .container {
            flex-direction: column;
            gap: 50px;
          }

          .faq-right {
            text-align: center;
            align-items: center;
          }

          .more-faq-btn {
            align-self: center;
          }

          .strokeBtn-wrapper {
            align-self: center;
          }

          .strokeBtn-wrapper :global(a) {
            align-self: center;
          }
        }

        @media (max-width: 480px) {
          .faq-title {
            font-size: 32px;
          }

          .faq-item {
            padding: 16px 20px;
          }

          .strokeBtn-wrapper :global(a) {
            font-size: 1rem;
            padding: 10px 30px;
          }
        }
      `}</style>
    </section>
  );
}