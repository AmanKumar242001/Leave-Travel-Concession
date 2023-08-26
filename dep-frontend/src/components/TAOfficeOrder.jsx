import React, { useState, useRef } from "react";
import Modal from "./Modal";

export default function TAOfficeOrder({ taInfo }) {
  console.log(taInfo);
  const orderRef = useRef(null);
  const genPdf = () => {
    print();
  };
  const [ltcData, setLtcData] = useState(taInfo.ltcInfo);
  return (
    <>
      <button className="dwnldpdf" onClick={genPdf}>
        {" "}
        Download PDF{" "}
      </button>
      <div className="max-w-screen-lg mx-auto bg-white" ref={orderRef}>
        <div className="flex items-center place-content-center space-x-8 my-4">
          <img
            className="w-24"
            src="http://www.iitrpr.ac.in/sites/default/files/image.jpg"
            alt=""
          />
          <div className="flex-col ">
            <h1 className="text-2xl">Indian Institute of Technology Ropar</h1>
            <p>Rupnagar, Punjab 140001 </p>
          </div>
        </div>
        <div className="flex place-content-around space-x-32 mb-4">
          <p>F.No. IITRPR/ACAD/{ltcData.id}</p>
          <p>
            Date:
            {ltcData.fillDate
              ? new Date(ltcData.fillDate).toISOString().substring(0, 10)
              : ""}
          </p>
        </div>
        <div className="flex justify-center">
          <h2 className="text-xl font-extrabold underline">Office Order</h2>
        </div>
        <div className="border-t-4 border-gray-300 my-2 flex">
          <p className="m-4 text-lg">
            <p className="mb-4 mt-8 font-semibold">
              Subject: Approval of Travel Allowance
            </p>

            <p className="mb-4">
              <p className="mb-4">
                This is to inform that the application of{" "}
                <span className="font-bold">
                  {ltcData.user.firstName + " " + ltcData.user.lastName}
                </span>{" "}
                for Travel Allowance (TA) for the year{" "}
                <span className="font-bold">
                  {ltcData.fromDate
                    ? new Date(ltcData.fromDate).getFullYear()
                    : ""}
                </span>{" "}
                has been approved by the management.
              </p>
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
                {ltcData.peopleInvolved.map((item) => " " + item.name)}
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
