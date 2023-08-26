import React from "react";
import Input from "./Input";

export default function EstabRow(props) {
  const { serialNo, particulars, name, type, dataOld, dataNew } = props;
  return (
    <>
      <tr className="border-b border-gray-200">
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50">{serialNo}</th>
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{particulars}</th>
        <td className="px-6 py-4 bg-gray-50">
          <Input name={"last" + name} type={type} value={dataOld} />
        </td>
        <td className="px-6 py-4">
          <Input name={"current" + name} type={type} value={dataNew} />
        </td>
      </tr>
    </>
  );
}
