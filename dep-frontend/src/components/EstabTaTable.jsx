import React, { useState } from "react";
import { useEffect } from "react";
import Input from "./Input";
import EstabRow from "./EstabRow";
import { ltcInfoOld } from "../dummy/ltcInfosOld";
import { ltcInfo } from "../dummy/ltcInfos";
import { useParams } from "react-router";

export default function EstabTaTable() {
  const [formDetail,setFormDetail]=useState(ltcInfo[0])
  const ltcData = ltcInfo[0];
  const ltcDataOld = ltcInfoOld[0];
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
      .then(setFormDetail);
  },[])

  return (
    <>
      <ul>
        <li className="py-8 flex space-x-1 items-center">
          <p className="whitespace-nowrap">Certified that Dr./Sri/Smt./Kum</p>
          
          <span contentEditable className="whitespace-nowrap font-medium">{`${formDetail.user.firstName}  ${formDetail.user.lastName}`}</span>
          <p className="whitespace-nowrap">
            has rendered continuous service for one year or more on the date of
            commencing the outward journey.
          </p>
        </li>
        <li>
          Certified that necessary entries as required under Para 3 of the
          Ministry of Home Affairs Para O.M. No. 43/1/55.Est.(A).Pt.II dated
          11th October, 1956 has been made in the Service Book of Dr. /Sri/Smt.
          <span contentEditable className="mx-2 whitespace-nowrap font-medium">{`${formDetail.user.firstName}  ${formDetail.user.lastName}`}</span>
          .
        </li>
      </ul>
    </>
  );
}
