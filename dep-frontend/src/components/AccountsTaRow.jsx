import React from "react";
import Input from "./Input";

export default function AccountsTaRow(props) {
  const { serialNo, particulars, name, type ,value} = props;
  return (
    <>
      <tr className="border-b border-gray-200">
        <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50">{serialNo}</th>
        <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{particulars}</th>
        <td className="px-6 py-4 bg-gray-50">
          <Input name={name} type={type} value={value} />
        </td>
      </tr>
    </>
  );
}
