import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <h2 className="text-2xl font-semibold text-gray-800">Counter</h2>
      <span className="text-5xl font-bold tabular-nums text-gray-900">
        {count}
      </span>
      <div className="flex gap-3">
        <button
          onClick={() => setCount((c) => c - 1)}
          className="rounded-lg bg-red-500 px-4 py-2 text-white font-medium transition-colors hover:bg-red-600 active:bg-red-700"
        >
          Decrement
        </button>
        <button
          onClick={() => setCount(0)}
          className="rounded-lg bg-gray-500 px-4 py-2 text-white font-medium transition-colors hover:bg-gray-600 active:bg-gray-700"
        >
          Reset
        </button>
        <button
          onClick={() => setCount((c) => c + 1)}
          className="rounded-lg bg-blue-500 px-4 py-2 text-white font-medium transition-colors hover:bg-blue-600 active:bg-blue-700"
        >
          Increment
        </button>
      </div>
    </div>
  );
}
