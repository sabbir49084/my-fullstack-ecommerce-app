import ForestyModal from "../components/common/ForestyModal";
import InvoiceForm from "../components/form/InvoiceForm";
import React, { useState } from "react";
import useInvoiceStore from "../store/useInvoiceStore";
import { Button } from "../components/common/Button";
import { Loader } from "../components/common/Loader";
import { generateInvoice } from "../services/invoiceService";

const Invoices = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { invoices, setInvoices, loading, setLoading } = useInvoiceStore();

  const handleGenerate = async (formData) => {
    try {
      setLoading(true);
      const newInvoice = await generateInvoice(formData);
      setInvoices([...invoices, newInvoice]);
      setModalOpen(false);
    } catch (error) {
      console.error("Invoice Generation Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Invoice Generator</h2>
        <Button onClick={() => setModalOpen(true)}>Create Invoice</Button>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {invoices.map((invoice) => (
            <div key={invoice.id} className="border p-4 rounded shadow">
              <h3 className="font-semibold text-lg">{invoice.customerName}</h3>
              <p className="text-sm text-gray-600">Amount: ${invoice.amount}</p>
              <p className="text-sm text-gray-600">Status: {invoice.status}</p>
            </div>
          ))}
        </div>
      )}

      <ForestyModal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <InvoiceForm
          onSubmit={handleGenerate}
          onCancel={() => setModalOpen(false)}
        />
      </ForestyModal>
    </div>
  );
};

export default Invoices;
