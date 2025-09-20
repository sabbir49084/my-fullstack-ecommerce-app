export const getAllInvoices = async () => {
  return [
    {
      id: "1",
      customerName: "John Doe",
      email: "john@example.com",
      amount: 250,
      status: "Paid",
    },
  ];
};

export const generateInvoice = async (data) => {
  return {
    id: Date.now().toString(),
    ...data,
  };
};
