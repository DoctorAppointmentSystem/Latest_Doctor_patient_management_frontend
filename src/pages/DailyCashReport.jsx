import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { QRCode } from 'react-qr-code'; // ✅ Correct import
import axiosInstance from '../api/axiosInstance';
import toast from 'react-hot-toast';
import * as XLSX from 'xlsx'; // ✅ Excel export library

function DailyCashReport() {
  const today = format(new Date(), 'yyyy-MM-dd');
  const [startDate, setStartDate] = useState(today);
  // Removed: endDate (not being used)

  // ✅ REAL DATA from backend
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState({
    totalPatients: 0,
    totalRevenue: 0,
    totalDiscount: 0,
    totalCharges: 0,
  });
  const [loading, setLoading] = useState(true);

  // ✅ Fetch real data from backend
  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`/appointments/daily-report?date=${startDate}`);
        const reportData = res.data;

        setData(reportData.appointments || []);
        setSummary(reportData.summary || {});
        toast.success('Report loaded successfully');
      } catch (error) {
        console.error('Error fetching report:', error);
        toast.error('Failed to load report');
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [startDate]);

  const totalAmount = summary.totalRevenue || 0;

  // ✅ NEW: Print Preview Handler
  const handlePrintPreview = () => {
    window.print();
  };

  // ✅ NEW: Excel Export Handler
  const handleExportExcel = () => {
    // Prepare data for Excel
    const excelData = data.map(row => ({
      'SR': row.sr,
      'Service': row.detail,
      'Patient Name': row.patientName,
      'Doctor': row.doctor,
      'Token': row.token,
      'Discount': row.discount > 0 ? row.discount : 0,
      'Cash': row.paymentMethod === 'Cash' ? row.amountPaid : 0,
      'Card': row.paymentMethod === 'Card' ? row.amountPaid : 0,
      'Online': row.paymentMethod === 'Online' ? row.amountPaid : 0,
      'Payment Method': row.paymentMethod,
    }));

    // Add summary row
    excelData.push({});
    excelData.push({
      'SR': 'SUMMARY',
      'Service': '',
      'Patient Name': `Total Patients: ${summary.totalPatients}`,
      'Doctor': `Total Revenue: ${summary.totalRevenue}`,
      'Token': '',
      'Discount': summary.totalDiscount,
      'Cash': summary.cashTotal || 0,
      'Card': summary.cardTotal || 0,
      'Online': summary.onlineTotal || 0,
      'Payment Method': '',
    });

    // Create worksheet
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Daily Cash Report');

    // Generate filename with date
    const filename = `DailyCashReport_${startDate}.xlsx`;

    // Download
    XLSX.writeFile(wb, filename);
    toast.success('Report exported to Excel!');
  };

  return (
    <div className="p-6 font-sans bg-gray-100 min-h-screen">
      {/* Header Filters */}
      <div className="flex flex-wrap gap-4 mb-4 items-center">
        <div className="flex items-center gap-2">
          <label className="font-semibold text-gray-700">Report Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handlePrintPreview}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          🖨️ Print Preview
        </button>
        <button
          onClick={handleExportExcel}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          📊 Export to Excel
        </button>
      </div>

      {/* Report Header */}
      <div className="bg-white p-4 border mb-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Cash Report</h2>
          <p className="text-sm">Date: {startDate}</p>
          <p className="text-sm">Jamil Eye Care Sahiwal</p>
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
                <th className="border p-2">Service</th>
                <th className="border p-2">Patient Name</th>
                <th className="border p-2">Doctor</th>
                <th className="border p-2">Token</th>
                <th className="border p-2">Discount</th>
                <th className="border p-2">Amount Paid</th>
                <th className="border p-2">C-Card</th>
                <th className="border p-2">Online</th>
                <th className="border p-2">Payment</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="10" className="text-center p-4">Loading...</td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan="10" className="text-center p-4 text-gray-500">
                    No appointments found for selected date
                  </td>
                </tr>
              ) : (
                data.map((row) => (
                  <tr key={row.sr} className="text-center">
                    <td className="border p-1">{row.sr}</td>
                    <td className="border p-1">{row.detail}</td>
                    <td className="border p-1 text-left">{row.patientName}</td>
                    <td className="border p-1">{row.doctor}</td>
                    <td className="border p-1">Token: {row.token}</td>
                    <td className="border p-1">{row.discount > 0 ? row.discount : '-'}</td>
                    <td className="border p-1 font-semibold">
                      {row.paymentMethod === 'Cash' ? `Rs. ${row.amountPaid}` : '-'}
                    </td>
                    <td className="border p-1 font-semibold">
                      {row.paymentMethod === 'Card' ? `Rs. ${row.amountPaid}` : '-'}
                    </td>
                    <td className="border p-1 font-semibold">
                      {row.paymentMethod === 'Online' ? `Rs. ${row.amountPaid}` : '-'}
                    </td>
                    <td className="border p-1">{row.paymentMethod}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="bg-white p-4 border rounded h-fit text-sm">
          <div className="flex justify-between mb-4">
            <h3 className="font-semibold text-base">Receipt & Payment List</h3>
            <p><strong>Total:</strong> Rs. {totalAmount.toLocaleString()}</p>
          </div>

          <ul className="space-y-1 mb-4">
            <li className="flex justify-between"><span>Total Patients</span><span>{summary.totalPatients}</span></li>
            <li className="flex justify-between"><span>Total Charges</span><span>Rs. {summary.totalCharges}</span></li>
            <li className="flex justify-between"><span>Discount</span><span>Rs. {summary.totalDiscount}</span></li>
            <li className="flex justify-between font-bold border-t pt-2"><span>Total Receipt</span><span>Rs. {totalAmount}</span></li>
            <li className="flex justify-between text-red-600"><span>Expense</span><span>Rs. {summary.totalExpense || 0}</span></li>
            <li className="flex justify-between text-red-600"><span>Refund</span><span>Rs. {summary.totalRefund || 0}</span></li>
            <li className="flex justify-between font-bold"><span>Cash in Hand</span><span>Rs. {totalAmount - (summary.totalExpense || 0) - (summary.totalRefund || 0)}</span></li>
            <li className="flex justify-between border-t pt-2 font-semibold text-green-700"><span>💵 Cash</span><span>Rs. {summary.cashTotal || 0}</span></li>
            <li className="flex justify-between font-semibold text-blue-700"><span>💳 Credit Card</span><span>Rs. {summary.cardTotal || 0}</span></li>
            <li className="flex justify-between font-semibold text-purple-700"><span>🌐 Online</span><span>Rs. {summary.onlineTotal || 0}</span></li>
            <li className="flex justify-between text-orange-600"><span>📈 Advance</span><span>Rs. {summary.totalAdvance || 0}</span></li>
          </ul>

          {/* ✅ Fixed QRCode */}
          <QRCode value={`Cash Report - ${startDate} - Rs. ${totalAmount}`} size={80} className="mb-4" />

          <p className="text-[10px] text-gray-600 border-t pt-2 italic">
            This is system generated report doesn't require any signature & stamp.
          </p>
        </div>
      </div>
    </div>
  );
}

export default DailyCashReport;
