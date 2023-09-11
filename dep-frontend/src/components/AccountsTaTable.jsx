import React, { useState } from "react";
import Input from "./Input";
import EstabRow from "./EstabRow";
// import { ltcInfoOld } from "../dummy/ltcInfosOld";
import AccountsTaRow from "./AccountsTaRow";
import { useParams } from "react-router";
import { ltcInfo } from "../dummy/ltcInfos";
import { taInfo } from "../dummy/taInfos";
import { useEffect } from "react";

export default function AccountsTaTable() {
  const [taData, setTaData] = useState(taInfo[0]);
  const { id } = useParams();

  useEffect(() => {
    fetch("https://dep-backend-ce.onrender.com/api/getTAInfo", {
      method: "POST",
      body: JSON.stringify({ taId: id }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(setTaData);
  }, []);

  let totalAirFare = taData.journeyDetails.reduce(
    (sum, item) =>
      sum + (item.modeOfTravel.toLowerCase() == "air" ? item.totalFare : 0),
    0
  );
  let totalBusFare = taData.journeyDetails.reduce(
    (sum, item) =>
      parseInt(sum) +
      (item.modeOfTravel.toLowerCase() == "bus" ? parseInt(item.totalFare) : 0),
    0
  );
  let totalTrainFare = taData.journeyDetails.reduce(
    (sum, item) =>
      sum + (item.modeOfTravel.toLowerCase() == "train" ? item.totalFare : 0),
    0
  );

  let totalFare = taData.journeyDetails.reduce(
    (sum, item) => sum + item.totalFare,
    0
  );
  let otherFare = totalFare - (totalAirFare + totalBusFare + totalTrainFare);

  console.log("data", taData.journeyDetails);
  console.log("fares", totalFare);

  let advanceDrawn = 0;
  if (taData.ltcInfo.advanceRequired)
    advanceDrawn =
      0.9 *
      taData.ltcInfo.expectedJourneyDetails.reduce(
        (sum, item) => sum + item.singleFare * item.noOfFares,
        0
      );

  return (
    <>
      {/* <Input label={"Date of Joining"} name="joining date" type="date" value={ltcData.user.dateOfJoining}/>
      <Input label={"Block Year"} name="blockYear" type="text" /> */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-left text-gray-500 ">
          <tr>
            <th scope="col" className="px-6 py-3 bg-gray-50">
              SI. No.
            </th>
            <th scope="col" className="px-6 py-3 ">
              Particulars
            </th>
            <th scope="col" className="px-6 py-3 bg-gray-50">
              Amount
            </th>
            {/* <th>Current LTC</th> */}
          </tr>

          <AccountsTaRow
            serialNo={"1."}
            particulars={"Air Fare"}
            name={"airFare"}
            type={"number"}
            value={totalAirFare}
          />

          <AccountsTaRow
            serialNo={"2."}
            particulars={"Train Fare"}
            name={"trainFare"}
            type={"number"}
            value={totalTrainFare}
          />

          <AccountsTaRow
            serialNo={"3."}
            particulars={"Bus Fare"}
            name={"busFare"}
            type={"number"}
            value={totalBusFare}
          />

          <AccountsTaRow
            serialNo={"4."}
            particulars={"Other if any"}
            name={"otherFare"}
            type={"number"}
            value={otherFare}
          />

          <AccountsTaRow
            serialNo={"5."}
            particulars={"Total (1 to 4)"}
            name={"totalFare"}
            type={"number"}
            value={totalFare}
          />

          <AccountsTaRow
            serialNo={"6."}
            particulars={"Advance if any to be deducted"}
            name={"advanceDeduction"}
            type={"number"}
            value={Math.max(0, advanceDrawn)}
          />

          <AccountsTaRow
            serialNo={"7."}
            particulars={"Net amount to be reimbursed to the Claimant (5-6)"}
            name={"netReimbursement"}
            type={"number"}
            value={Math.max(0, totalFare - advanceDrawn)}
          />
        </table>
      </div>
    </>
  );
}
