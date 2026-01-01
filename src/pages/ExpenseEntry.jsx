import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import toast from 'react-hot-toast';

function ExpenseEntry() {
    const [expense, setExpense] = useState({
        date: new Date().toISOString().split('T')[0],
        category: 'Medicine',
        description: '',
        amount: '',
    });

    const handleChange = (e) => {
        setExpense({ ...expense, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!expense.description || !expense.amount) {
            toast.error('Please fill all fields');
            return;
        }

        try {
            await axiosInstance.post('/expenses', {
                ...expense,
                amount: Number(expense.amount),
                addedBy: 'Admin', // You can get from auth context
            });

            toast.success('Expense added successfully!');

            // Reset form
            setExpense({
                date: new Date().toISOString().split('T')[0],
                category: 'Medicine',
                description: '',
                amount: '',
            });
        } catch (error) {
            console.error('Error adding expense:', error);
            toast.error(error.response?.data?.message || 'Failed to add expense');
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Add Daily Expense</h2>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date
                    </label>
                    <input
                        type="date"
                        name="date"
                        value={expense.date}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                    </label>
                    <select
                        name="category"
                        value={expense.category}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="Medicine">Medicine</option>
                        <option value="Salary">Salary</option>
                        <option value="Utilities">Utilities (Electricity, Water)</option>
                        <option value="Maintenance">Maintenance</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={expense.description}
                        onChange={handleChange}
                        placeholder="Brief description of the expense..."
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 h-24"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Amount (Rs.)
                    </label>
                    <input
                        type="number"
                        name="amount"
                        value={expense.amount}
                        onChange={handleChange}
                        placeholder="0"
                        min="0"
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded transition"
                >
                    💰 Add Expense
                </button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
                <p className="text-sm text-blue-800">
                    <strong>Note:</strong> Expenses added here will automatically appear in the Daily Cash Report.
                </p>
            </div>
        </div>
    );
}

export default ExpenseEntry;
