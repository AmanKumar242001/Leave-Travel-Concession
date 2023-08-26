import React from "react";
import LiveTaTable from "../components/LiveTaTable";
import { useState, useEffect } from "react";
import { taInfo } from "../dummy/taInfos";

export default function LiveTaApplication() {
  const [liveTaApplications, setLiveTaApplications] = useState([]);
  const handleTaList = (data) => {
    setLiveTaApplications(data);
  };
  useEffect(() => {
    fetch("/api/listLiveTAApplications", {
      method: "POST",
    })
      .then((res) => res.json())
      .then(handleTaList);
  },[]);

  return (
    <div className="bg-yellow-50 h-[88vh]">

    <LiveTaTable data={liveTaApplications} />;
    </div>
  )
}
