import React from "react";
import SubscriberCard from "../components/cards/SubscriberCard";
import SubscriberForm from "../components/form/SubscriberForm";

const dummySubscribers = [
  { email: "client1@mail.com", joined: "2025-06-21" },
  { email: "client2@mail.com", joined: "2025-06-24" },
  { email: "client3@mail.com", joined: "2025-07-02" },
];

const MarketingTools = () => {
  return (
    <div className="space-y-8 animate-fade-in-up">
      <SubscriberForm />

      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-3">Subscribers List</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {dummySubscribers.map((sub, index) => (
            <SubscriberCard key={index} email={sub.email} joined={sub.joined} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketingTools;
