import React, { useRef } from "react";
import Input from "./Input";

function getStr(value) {
  return `${value}`;
}

export default function Table({ fields, data, setData, readOnly = false }) {
  const removePerson = (e, item) => {
    e.preventDefault();
    setData((data) => data.filter((obj) => obj !== item));
  };
  const newRef = useRef(null);
  const addNewRowHandle = () => {
    let addNewRow = true;
    const inputs = [...newRef.current.querySelectorAll("input")];
    const newRow = Object.fromEntries(
      new Map(
        inputs.map((input) => {
          let out = [0, 0];
          out[0] = input.name;

          if (input.type == "checkbox") {
            out[1] = input.checked;
            input.checked = false;
          } else {
            out[1] = input.value;
            if (input.value == "") {
              addNewRow = false;
            }
          }
          input.value = "";

          return out;
        })
      )
    );
    addNewRow && setData((data) => [...data, newRow]);
  };
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg pb-2 pl-2 mb-2 bg-white">
        <table className="w-full text-base text-left text-gray-900">
          <thead className="text-base border-b border-gray-200 text-gray-700 whitespace-nowrap">
            <tr>
              {fields.map((field) => (
                <th scope="col" className="px-6 py-3 font-bold">
                  {field.heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr className="border-b border-gray-200">
                {fields.map((field) => (
                  <td className="px-6 py-2">
                    {getStr(
                      item[
                      field.stateKey
                        ? field.stateKey
                        : field.heading.replaceAll(" ", "_").toLowerCase()
                      ]
                    )}
                  </td>
                ))}
                {!readOnly && (
                  <button
                    className="m-2 bg-red-500 px-1 rounded-md text-white font-bold"
                    onClick={(e) => removePerson(e, item)}
                  >
                    X
                  </button>
                )}
              </tr>
            ))}
            {!readOnly && (
              <tr ref={newRef}>
                {fields.map((field) => (
                  <td>
                    <Input
                      type={field.type}
                      name={
                        field.stateKey
                          ? field.stateKey
                          : field.heading.replaceAll(" ", "_").toLowerCase()
                      }
                    />
                  </td>
                ))}
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {!readOnly && (
        <>
          <button
            type="button"
            onClick={addNewRowHandle}
            className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            + Add Row
          </button>
        </>
      )}
    </>
  );
}
