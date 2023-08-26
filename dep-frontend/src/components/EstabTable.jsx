import React, { useEffect, useState } from "react";
import Input from "./Input";
import EstabRow from "./EstabRow";
import { ltcInfoOld } from "../dummy/ltcInfosOld";
import { ltcInfo } from "../dummy/ltcInfos";
import { useParams } from "react-router";

export default function EstabTable() {
  const [ltcData, setLtcData] = useState(ltcInfo[0]);
  const [ltcDataOld, setLtcDataOld] = useState({});
  const { id } = useParams();
  useEffect(() => {
    fetch("/api/getLTCInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ltcId: id }),
    })
      .then((res) => res.json())
      .then(setLtcData);
  

    fetch("/api/getOldLTCInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ltcId: id }),
    })
      .then((res) => res.json())
      .then(setLtcDataOld);
  }, []);
  console.log('standing leave data is', ltcData.user.standingEarnedLeave)
  return (
    <>
      <div className="m-4 grid gap-6 mb-1 md:grid-cols-2 xl:grid-cols-4">
        <Input
          label={"Date of Joining"}
          name="joining date"
          type="date"
          value={new Date(ltcData.user.dateOfJoining).toISOString().substring(0, 10)}
        />
        <Input label={"Block Year"} name="blockYear" type="text" value={new Date().getFullYear()}/>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-base text-left text-gray-500 bg-white">
          <thead>
            <tr>
              <th scope="col" className="px-6 py-3 bg-gray-50">
                SI. No.
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-50">
                Particulars
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-50">
                Last Availed
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-50">
                Current LTC
              </th>
            </tr>
          </thead>
          <EstabRow
            serialNo={"1."}
            particulars={"Nature of Visiting Place"}
            name={"LtcNature"}
            type={"text"}
            dataOld={ltcDataOld.natureOfTravel}
            dataNew={ltcData.natureOfTravel}
          />
          <EstabRow
            serialNo={"2."}
            particulars={"Period From"}
            name={"periodFrom"}
            type={"date"}
            dataOld={ltcDataOld.fromDate ? new Date(ltcDataOld.fromDate).toISOString().substring(0, 10) : ""}
            dataNew={new Date(ltcData.fromDate).toISOString().substring(0, 10)}
          />
          <EstabRow
            serialNo={"3."}
            particulars={"Period To"}
            name={"periodTo"}
            type={"date"}
            dataOld={
              ltcDataOld.toDate
                ? new Date(ltcDataOld.toDate).toISOString().substring(0, 10)
                : ""
            }
            dataNew={new Date(ltcData.toDate).toISOString().substring(0, 10)}
          />
          <EstabRow
            serialNo={"4."}
            particulars={"Earned leave encashment (No. of Days)"}
            name={"earnedLeaveDays"}
            type={"number"}
            dataOld={
              ltcDataOld.toDate
                ? new Date(ltcDataOld.toDate).toISOString().substring(0, 10)
                : ""
            }
            dataNew={ltcData.encashmentNoOfDays}
          />
          <EstabRow
            serialNo={"5."}
            particulars={"Earned Leave standing to his credit"}
            name={"standingEarnedLeave"}
            type={"number"}
            dataOld={(ltcDataOld.user ?? {}).standingEarnedLeave}
            dataNew={ltcData.user.standingEarnedLeave}
          />
          <EstabRow
            serialNo={"6."}
            particulars={"Balance Earned leave after this encashment"}
            name={"balanceEarnedLeave"}
            type={"number"}
            dataOld={
              (ltcDataOld.user ?? {}).standingEarnedLeave ??
              0 - ltcDataOld.encashmentNoOfDays ??
              0
            }
            dataNew={
              ltcData.user.standingEarnedLeave - ltcData.encashmentNoOfDays
            }
          />
          <EstabRow
            serialNo={"7."}
            particulars={"Earned Leave encashment admissible"}
            name={"admissibleEarnedLeave"}
            type={"number"}
            dataOld={ltcDataOld.encashmentNoOfDays}
            dataNew={ltcData.encashmentNoOfDays}
          />
        </table>
      </div>
    </>
  );
}
