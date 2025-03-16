"use client";

import type React from "react";

import { useState } from "react";
import {
  CreditCard,
  Download,
  Plus,
  Trash2,
  Calendar,
  DollarSign,
  Receipt,
  AlertCircle,
} from "lucide-react";

// Sample payment methods
const paymentMethods = [
  {
    id: "pm_1",
    type: "card",
    brand: "visa",
    last4: "4242",
    expMonth: 12,
    expYear: 2024,
    isDefault: true,
  },
  {
    id: "pm_2",
    type: "card",
    brand: "mastercard",
    last4: "5555",
    expMonth: 8,
    expYear: 2025,
    isDefault: false,
  },
];

// Sample transactions
const transactions = [
  {
    id: "tx_1",
    date: "May 15, 2023",
    description: "Complete Web Development Bootcamp",
    amount: 89.99,
    status: "completed",
    receipt: "INV-2023-001",
  },
  {
    id: "tx_2",
    date: "April 22, 2023",
    description: "Data Science & Machine Learning Masterclass",
    amount: 99.99,
    status: "completed",
    receipt: "INV-2023-002",
  },
  {
    id: "tx_3",
    date: "March 10, 2023",
    description: "UI/UX Design Fundamentals",
    amount: 79.99,
    status: "completed",
    receipt: "INV-2023-003",
  },
  {
    id: "tx_4",
    date: "February 5, 2023",
    description: "Python Programming for Beginners",
    amount: 69.99,
    status: "completed",
    receipt: "INV-2023-004",
  },
  {
    id: "tx_5",
    date: "January 20, 2023",
    description: "Introduction to Digital Marketing",
    amount: 59.99,
    status: "completed",
    receipt: "INV-2023-005",
  },
];

const Billing = () => {
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);
  const [newCardData, setNewCardData] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvc: "",
  });
  const [cardError, setCardError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Format card number with spaces
    if (name === "cardNumber") {
      const formatted = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim();
      setNewCardData((prev) => ({ ...prev, [name]: formatted }));
    }
    // Format expiry date with slash
    else if (name === "expiry") {
      const cleaned = value.replace(/\D/g, "");
      let formatted = cleaned;

      if (cleaned.length > 2) {
        formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
      }

      setNewCardData((prev) => ({ ...prev, [name]: formatted }));
    }
    // Handle other inputs normally
    else {
      setNewCardData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    setCardError("");

    // Simple validation
    if (
      !newCardData.cardNumber ||
      !newCardData.cardName ||
      !newCardData.expiry ||
      !newCardData.cvc
    ) {
      setCardError("All fields are required");
      return;
    }

    if (newCardData.cardNumber.replace(/\s/g, "").length !== 16) {
      setCardError("Card number must be 16 digits");
      return;
    }

    if (!/^\d{2}\/\d{2}$/.test(newCardData.expiry)) {
      setCardError("Expiry date format should be MM/YY");
      return;
    }

    if (!/^\d{3,4}$/.test(newCardData.cvc)) {
      setCardError("CVC must be 3 or 4 digits");
      return;
    }

    // In a real app, you would send this data to your backend
    alert("Card added successfully!");
    setIsAddCardModalOpen(false);
    setNewCardData({
      cardNumber: "",
      cardName: "",
      expiry: "",
      cvc: "",
    });
  };

  const handleRemoveCard = (id: string) => {
    // In a real app, you would send this request to your backend
    alert(`Card ${id} removed successfully!`);
  };

  const handleSetDefaultCard = (id: string) => {
    // In a real app, you would send this request to your backend
    alert(`Card ${id} set as default!`);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
          Billing & Payments
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Manage your payment methods and view transaction history
        </p>
      </div>

      {/* Payment Methods */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Payment Methods
          </h2>
          <button
            onClick={() => setIsAddCardModalOpen(true)}
            className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add New
          </button>
        </div>

        <div className="p-6">
          {paymentMethods.length > 0 ? (
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-white dark:bg-gray-800 rounded-md flex items-center justify-center mr-4 border border-gray-200 dark:border-gray-700">
                      {method.brand === "visa" ? (
                        <span className="text-blue-600 font-bold">VISA</span>
                      ) : method.brand === "mastercard" ? (
                        <span className="text-red-600 font-bold">MC</span>
                      ) : (
                        <CreditCard className="h-6 w-6 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {method.brand.charAt(0).toUpperCase() +
                          method.brand.slice(1)}{" "}
                        •••• {method.last4}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Expires {method.expMonth}/{method.expYear}
                        {method.isDefault && (
                          <span className="ml-2 px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs">
                            Default
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!method.isDefault && (
                      <button
                        onClick={() => handleSetDefaultCard(method.id)}
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                      >
                        Set as default
                      </button>
                    )}
                    <button
                      onClick={() => handleRemoveCard(method.id)}
                      className="p-1 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <CreditCard className="h-12 w-12 mx-auto text-gray-400 mb-3" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                No payment methods
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Add a payment method to make purchases
              </p>
              <button
                onClick={() => setIsAddCardModalOpen(true)}
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Payment Method
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Transaction History
          </h2>
        </div>

        <div className="p-6">
          {transactions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700/50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Receipt
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {transaction.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {transaction.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        ${transaction.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                          {transaction.status.charAt(0).toUpperCase() +
                            transaction.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a
                          href={`/receipts/${transaction.receipt}.pdf`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 inline-flex items-center"
                        >
                          <Download className="h-4 w-4 mr-1" />
                          PDF
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <Receipt className="h-12 w-12 mx-auto text-gray-400 mb-3" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                No transactions yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Your transaction history will appear here
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Add Card Modal */}
      {isAddCardModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Add Payment Method
            </h3>

            {cardError && (
              <div className="mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                {cardError}
              </div>
            )}

            <form onSubmit={handleAddCard}>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="cardNumber"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Card Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <CreditCard className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={newCardData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="cardName"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Name on Card
                  </label>
                  <input
                    type="text"
                    id="cardName"
                    name="cardName"
                    value={newCardData.cardName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="expiry"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Expiry Date
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="expiry"
                        name="expiry"
                        value={newCardData.expiry}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        maxLength={5}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="cvc"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      CVC
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <DollarSign className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="cvc"
                        name="cvc"
                        value={newCardData.cvc}
                        onChange={handleInputChange}
                        placeholder="123"
                        maxLength={4}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddCardModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Billing;
