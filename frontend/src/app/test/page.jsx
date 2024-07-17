"use client"
import React from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const ExportExcel = () => {
  const sampleData = [
    { name: 'John Doe', age: 28, email: 'john.doe@example.com' },
    { name: 'Jane Smith', age: 34, email: 'jane.smith@example.com' },
    { name: 'Sam Green', age: 22, email: 'sam.green@example.com' },
  ];

  const exportToExcel = () => {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    // Convert the sample data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(sampleData);
    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    // Generate a binary string from the workbook
    const excelBuffer = XLSX.write(workbook, { bookType: 'xls', type: 'array' });
    // Create a blob from the binary string
    const blob = new Blob([excelBuffer], { type: 'application/vnd.ms-excel' });
    // Use file-saver to save the blob as a file
    saveAs(blob, 'sampleData.xls');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <button
        onClick={exportToExcel}
        className="px-6 py-3 font-bold text-white bg-blue-500 rounded-full shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
      >
        Download Excel File
      </button>
    </div>
  );
};

export default ExportExcel;
