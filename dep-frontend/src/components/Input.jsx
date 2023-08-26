import React from "react";

export default function Input(props) {
  const { label, ...remaining } = props;
  // if (label)
  return (
    <>
      <label className="block mb-2 text-sm font-medium text-gray-900">
        {label}
        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" {...remaining} />
      </label>
    </>
  );
  // return <input {...remaining} />;
}
