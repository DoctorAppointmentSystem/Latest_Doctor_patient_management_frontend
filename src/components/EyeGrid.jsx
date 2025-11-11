// EyeGrid.jsx
import React from 'react';

// A reusable component for a single eye's prescription
function EyeGrid({ title, sph = "", cyl = "", axis = "", va = "", add = "", n6 = "", onChange, section, side }) {
  // onChange(section, side, field, value)
  const handle = (field) => (e) => {
    if (typeof onChange === "function") onChange(section, side, field, e.target.value);
  };

  return (
    <div className="w-full max-w-md rounded-lg border border-gray-400 bg-white shadow-sm overflow-hidden">
      {/* 1. Title Bar */}
      <h3 className="p-2 text-center font-semibold bg-gray-100 border-b border-gray-400">
        {title}
      </h3>
      {/* 2. Main 4-Column Grid */}
      <div className="grid grid-cols-4 text-center">
        {/* Row 1: Headers */}
        <div className="p-2 font-medium text-sm text-gray-600 border-b border-r border-gray-300">SPH</div>
        <div className="p-2 font-medium text-sm text-gray-600 border-b border-r border-gray-300">CYL</div>
        <div className="p-2 font-medium text-sm text-gray-600 border-b border-r border-gray-300">AXIS</div>
        <div className="p-2 font-medium text-sm text-gray-600 border-b border-gray-300">VA</div>

        {/* Row 2: Editable Values */}
        <div className="p-3 font-mono border-b border-r border-gray-300">
          <input type="text" value={sph} onChange={handle('sph')} className="w-full text-center outline-none" />
        </div>
        <div className="p-3 font-mono border-b border-r border-gray-300">
          <input type="text" value={cyl} onChange={handle('cyl')} className="w-full text-center outline-none" />
        </div>
        <div className="p-3 font-mono border-b border-r border-gray-300">
          <input type="text" value={axis} onChange={handle('axis')} className="w-full text-center outline-none" />
        </div>
        <div className="p-3 font-mono border-b border-gray-300">
          <input type="text" value={va} onChange={handle('va')} className="w-full text-center outline-none" />
        </div>

        {/* Row 3: Bottom Section (Spanning 2 columns each) */}
        <div className="col-span-2 p-3 font-medium border-r border-gray-300">
          <input type="text" value={add} onChange={handle('add')} className="w-full text-center outline-none" />
        </div>
        <div className="col-span-2 p-3 font-medium">
          <input type="text" value={n6} onChange={handle('n6')} className="w-full text-center outline-none" />
        </div>
      </div>
    </div>
  );
}

export default EyeGrid;