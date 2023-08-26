import React, { useEffect, useState, useRef } from "react";
import Modal from "./Modal";

export default function OfficeOrder({ ltcInfo }) {
  const [ltcData, setLtcData] = useState(ltcInfo);
  const orderRef = useRef(null);
  const genPdf = () => {
    print();
  };
  return (
    <>
      <button className="dwnldpdf" onClick={genPdf}>
        {" "}
        Download PDF{" "}
      </button>
      <div className="max-w-screen-lg mx-auto bg-white py-4" ref={orderRef}>
        <div className="flex items-center place-content-center space-x-14 my-4">
          <img
            className="w-24"
            src="http://www.iitrpr.ac.in/sites/default/files/image.jpg"
            alt=""
          />
          <div className="flex-col ">
            <h1 className="text-2xl font-semibold">
              Indian Institute of Technology Ropar
            </h1>
            <p>Rupnagar, Punjab 140001 </p>
          </div>
        </div>
        <div className="flex place-content-around space-x-32 mb-4">
          <p>F.No. IITRPR/ACAD/{ltcData.id}</p>
          <p>
            Date:{ltcData.fillDate? new Date(ltcData.fillDate).toISOString().substring(0, 10): ""}
          </p>
        </div>
        <div className="flex justify-center">
          <h2 className="text-xl font-extrabold underline">Office Order</h2>
        </div>
        <div className="border-t-4 border-gray-300 my-2 flex">
          <p className="m-4 text-lg">
            <p className="my-8 font-semibold">
              Subject: Approval of Leave Travel Concession (LTC)
            </p>

            <p className="mb-4">
              This is to inform that the application of{" "}
              <span className="font-bold">
                {ltcData.user.firstName + " " + ltcData.user.lastName}
              </span>{" "}
              for Leave Travel Concession (LTC) for the year{" "}
              <span className="font-bold">
                {ltcData.fromDate
                  ? new Date(ltcData.fromDate).getFullYear()
                  : ""}
              </span>{" "}
              has been approved by the management.
            </p>

            <p>The details of LTC are as follows:</p>
            <div className="mb-32">
              <li>Destination of travel: {ltcData.placeToVisit}</li>
              <li>
                Journey Duration:{" "}
                {(ltcData.fromDate
                  ? new Date(ltcData.fromDate).toISOString().substring(0, 10)
                  : "") +
                  "-" +
                  (ltcData.toDate
                    ? new Date(ltcData.toDate).toISOString().substring(0, 10)
                    : "")}
              </li>
              <li>
                Names of accompanying family members (if any):
                {ltcData.peopleInvolved.map(
                  (item, index) =>
                    " " +
                    item.name +
                    (index < ltcData.peopleInvolved.length - 1 ? "," : "")
                )}
              </li>
            </div>

            <p>
              Copy To:
              <div className="mb-4 mt-2">
                <li>Dean (Faculty Affairs & Administration)</li>
                <li>HOD</li>
                <li>Applicant</li>
                <li>Registrar (Accounts)</li>
              </div>
            </p>
            <div className="flex justify-end items-end">
              <div className="fex-col">
                <img
                  className="w-[300px] h-[100px]"
                  src="data:image/png;base64,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"
                  alt="Sign"
                />
                <p className="px-32">Registrar</p>
              </div>
            </div>
          </p>
        </div>
      </div>
    </>
  );
}
