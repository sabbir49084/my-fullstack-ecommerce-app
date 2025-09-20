// Dummy API - Replace with real API calls

let mockMessages = [
  {
    id: "1",
    userName: "Jamal",
    text: "How can I track my order?",
    date: "2025-08-04",
    reply: "You can track it from your dashboard.",
  },
];

export const getAllMessages = async () => {
  return new Promise((res) => {
    setTimeout(() => res([...mockMessages]), 300);
  });
};

export const postMessage = async ({ userName, text }) => {
  const newMsg = {
    id: Date.now().toString(),
    userName,
    text,
    date: new Date().toISOString().split("T")[0],
    reply: null,
  };
  mockMessages.push(newMsg);
  return new Promise((res) => {
    setTimeout(() => res(newMsg), 300);
  });
};

export const replyToMessage = async (id, replyText) => {
  mockMessages = mockMessages.map((msg) =>
    msg.id === id ? { ...msg, reply: replyText } : msg
  );
  return new Promise((res) => {
    setTimeout(() => res({ id, reply: replyText }), 300);
  });
};
