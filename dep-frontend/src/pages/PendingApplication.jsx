import React, { useState } from "react";
import { ltcInfo } from "../dummy/ltcInfos";
import PendingTable from "../components/PendingTable";
import { useEffect } from "react";

export default function PendingApplication() {
  const [pendingList, setPendingList] = useState([]);

  const getData = () => {
    fetch("https://dep-backend-ce.onrender.com/listPendingLTCApplication", { method: "POST" })
      .then((res) => res.json())
      .then((data) => setPendingList(data));
  };

  useEffect(() => {
    getData();
  }, []);
  // getData();
  //   return <>Pending Application</>;

  return (
    <div className="">
      <PendingTable data={pendingList} />
    </div>
  );
}
