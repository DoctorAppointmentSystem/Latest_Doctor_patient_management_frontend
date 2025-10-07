import React, { useState } from 'react';
import { format } from 'date-fns';
import{ QRCode }from 'react-qr-code'; // ✅ Correct import

function DailyCashReport() {
  const [startDate, setStartDate] = useState('2025-06-25');
  const [endDate, setEndDate] = useState('2025-06-25');

  const data = Array.from({ length: 18 }).map((_, i) => ({
    sr: i + 1,
    detail: 'Cash Reservation',
    head: 'Name ' + (i + 1),
    bank: 'Reception (CHR)',
    trxNo: `JEC-OPD-0625-0918${70 + i}`,
    receipt: 1000,
  }));

  const totalAmount = data.reduce((sum, row) => sum + row.receipt, 0);

  return (
    <div className="p-6 font-sans bg-gray-100 min-h-screen">
      {/* Header Filters */}
      <div className="flex flex-wrap gap-4 mb-4 items-center">
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="border p-2 rounded" />
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="border p-2 rounded" />
        <select className="border p-2 rounded">
          <option>Select Branch</option>
        </select>
        <select className="border p-2 rounded">
          <option>Select User</option>
        </select>
        <button className="bg-gray-700 text-white px-4 py-2 rounded">Print Preview</button>
        <button className="bg-gray-700 text-white px-4 py-2 rounded">Table Preview</button>
      </div>

      {/* Report Header */}
      <div className="bg-white p-4 border mb-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Cash Report</h2>
          <p className="text-sm">Reception From: {startDate} to {endDate}</p>
          <p className="text-sm">User: Reception BR, Jamil Eye Care Sahiwal</p>
          <p className="text-sm">Printing Time: {format(new Date(), 'PPPpp')}</p>
        </div>
      </div>

      {/* Report Table and Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Table */}
        <div className="lg:col-span-3">
          <table className="w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">SR</th>
                <th className="border p-2">Detail</th>
                <th className="border p-2">Head</th>
                <th className="border p-2">Bank</th>
                <th className="border p-2">Trx No</th>
                <th className="border p-2">Adjustment</th>
                <th className="border p-2">Receipt</th>
                <th className="border p-2">C-Card</th>
                <th className="border p-2">Online</th>
                <th className="border p-2">Payment</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.sr} className="text-center">
                  <td className="border p-1">{row.sr}</td>
                  <td className="border p-1">{row.detail}</td>
                  <td className="border p-1">{row.head}</td>
                  <td className="border p-1">{row.bank}</td>
                  <td className="border p-1">{row.trxNo}</td>
                  <td className="border p-1">-</td>
                  <td className="border p-1">{row.receipt}</td>
                  <td className="border p-1">-</td>
                  <td className="border p-1">-</td>
                  <td className="border p-1">-</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="bg-white p-4 border rounded h-fit text-sm">
          <div className="flex justify-between mb-4">
            <h3 className="font-semibold text-base">Receipt & Payment List</h3>
            <p><strong>Total:</strong> {totalAmount.toLocaleString()}</p>
          </div>

          <ul className="space-y-1 mb-4">
            <li className="flex justify-between"><span>Total Receipt</span><span>{totalAmount}</span></li>
            <li className="flex justify-between"><span>Expense</span><span>0</span></li>
            <li className="flex justify-between"><span>Dr Share</span><span>0</span></li>
            <li className="flex justify-between"><span>Refund</span><span>0</span></li>
            <li className="flex justify-between font-bold"><span>Cash in Hand</span><span>{totalAmount}</span></li>
            <li className="flex justify-between"><span>Credit Card</span><span>0</span></li>
            <li className="flex justify-between"><span>Cash</span><span>{totalAmount}</span></li>
            <li className="flex justify-between"><span>Online</span><span>0</span></li>
            <li className="flex justify-between"><span>Advance</span><span>0</span></li>
          </ul>

          {/* ✅ Fixed QRCode */}
          <QRCode value={`Cash Report - ${endDate}`} size={80} className="mb-4" />

          <p className="text-[10px] text-gray-600 border-t pt-2 italic">
            This is system generated report doesn't require any signature & stamp.
          </p>
        </div>
      </div>
    </div>
  );
}

export default DailyCashReport;
