import React from 'react';

function AvailableCells() {
  return (
    <div>
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-500">Available Cells</h1>
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-3 place-items-center gap-5 mt-5 w-fit">
          <div className="flex items-center justify-center bg-green-500 w-10 h-10 rounded-full">1</div>
          <div className="flex items-center justify-center bg-green-500 w-10 h-10 rounded-full">2</div>
          <div className="flex items-center justify-center bg-green-500 w-10 h-10 rounded-full">3</div>
          <div className="flex items-center justify-center bg-green-500 w-10 h-10 rounded-full">4</div>
          <div className="flex items-center justify-center bg-green-500 w-10 h-10 rounded-full">5</div>
          <div className="flex items-center justify-center bg-green-500 w-10 h-10 rounded-full">6</div>
          <div className="flex items-center justify-center bg-green-500 w-10 h-10 rounded-full">11</div>
        </div>
      </div>
    </div>
  );
}

export default AvailableCells;
