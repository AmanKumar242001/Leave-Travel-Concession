import React, { useState } from "react";
import { taInfo } from "../dummy/taInfos";
import PendingTaTable from "../components/PendingTaTable.jsx";
import { useEffect } from "react";

export default function PendingTaApplication() {
  const [pendingTaList, setPendingTaList] = useState([]);

  const getTaData = () => {
    fetch("/api/listPendingTAApplication", { method: "POST" })
      .then((res) => res.json())
      .then((data) => setPendingTaList(data));
  };

  useEffect(() => {
    getTaData();
  }, []);

  return(
    <div className="bg-yellow-50 h-[88vh]">

   <PendingTaTable data={pendingTaList} />;
    </div>
  )
}
