import React, { useState } from 'react';

const discountTypes = ['% Discount', 'Flat Discount'];

export default function DiscountTypes() {
    const [showCheckIn, setShowCheckIn] = useState(false);

    const handleAddReservation = () => {
        setShowCheckIn(true);
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 via-blue-400 to-green-400 p-6 rounded-lg text-white flex justify-between items-start">
                <div className="flex space-x-4">
                    <img src="/avatar.png" alt="avatar" className="w-14 h-14 rounded-full border-2 border-white" />
                    <div>
                        <h1 className="text-xl font-bold">Test</h1>
                        <p className="text-sm">Male · 39 years, 11 months old</p>
                        <p className="text-sm mt-1">MR#: 026507-0625-JEC · Created 0 minutes ago</p>
                        <p className="text-sm mt-1 text-gray-200">Referred by: Self</p>
                    </div>
                </div>
                <div className="space-y-3 p-4 bg-green-400 rounded text-white max-w-xs">
                    {/* Name input with icon */}
                    <div className="flex items-center space-x-2 bg-green-300 bg-opacity-30 p-2 rounded">
                        <span>👤</span>
                        <input
                            type="text"
                            value="S/o Test"
                            disabled
                            className="bg-transparent outline-none text-white w-full"
                        />
                    </div>

                    {/* Location input with icon */}
                    <div className="flex items-center space-x-2 bg-green-300 bg-opacity-30 p-2 rounded">
                        <span>📍</span>
                        <input
                            type="text"
                            placeholder=""
                            disabled
                            className="bg-transparent outline-none text-white w-full"
                        />
                    </div>

                    {/* Ledger Balance section */}
                    <div className="flex items-center space-x-2 text-sm text-white opacity-70">
                        <span>📘 Ledger Balance:</span>
                        <input
                            type="text"
                            value="0.0"
                            disabled
                            className="w-12 text-center rounded bg-white text-black"
                        />
                        <button className="bg-white text-black p-1 rounded hover:bg-gray-200">
                            ↻
                        </button>
                    </div>

                    {/* Manual Token input */}
                    <input
                        type="text"
                        placeholder="Manual Token"
                        className="w-full p-1 rounded bg-white text-black"
                    />
                </div>
            </div>

            {/* Service & Amount Form */}
            <div className="bg-white p-6 rounded-lg space-y-4 shadow">
                <div className="flex items-center space-x-4">
                    <button className="border px-4 py-2 rounded hover:bg-gray-100">Reset</button>
                    <input
                        type="search"
                        placeholder="Search for a service…"
                        className="flex-1 border p-2 rounded"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium">Charges</label>
                        <input type="number" className="mt-1 border p-2 rounded w-full" placeholder="Rs. 0.00" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Claimable</label>
                        <div className="flex space-x-2 mt-1">
                            <input type="number" className="border p-2 rounded w-full" placeholder="Rs. 0.00" />
                            <input type="text" className="border p-2 rounded w-24" placeholder="Approval ID" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Actual</label>
                        <input type="number" className="mt-1 border p-2 rounded w-full" placeholder="Rs. 0.00" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium">Discount Type</label>
                        <select className="mt-1 border p-2 rounded w-full">
                            <option>--select discount type--</option>
                            {discountTypes.map(dt => <option key={dt}>{dt}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Discount</label>
                        <input type="number" className="mt-1 border p-2 rounded w-full" placeholder="Rs. 0.00" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Remarks</label>
                        <input type="text" className="mt-1 border p-2 rounded w-full" placeholder="Reason for discount" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium">Amount Payable</label>
                    <input type="number" className="mt-1 border p-2 rounded w-full" placeholder="Rs. 0.00" />
                </div>

                <button
                    className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
                    onClick={handleAddReservation}
                >
                    Add to this reservation (Alt + A)
                </button>
            </div>

            {/* Check-in Section */}
            {showCheckIn && (
                <div className="mt-4 bg-white p-4 rounded shadow">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-center">
                            <thead className="border-b font-medium">
                                <tr>
                                    <th>Sr#</th>
                                    <th>Charges</th>
                                    <th>Claim</th>
                                    <th className="text-blue-600">Discount</th>
                                    <th>Payable</th>
                                    <th>Paid</th>
                                    <th>Refunded</th>
                                    <th>Balance</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b">
                                    <td>1</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td>
                                        <button className="text-red-600 hover:text-red-800">🗑️</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-center mt-4">
                        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 flex items-center space-x-2">
                            <span>📋</span>
                            <span>Check-in</span>
                        </button>
                    </div>
                </div>
            )}

            {/* History Link */}
            <div className="text-center">
                <a href="#" className="text-sm text-gray-600 underline">
                    View Patient History
                </a>
            </div>
        </div>
    );
}