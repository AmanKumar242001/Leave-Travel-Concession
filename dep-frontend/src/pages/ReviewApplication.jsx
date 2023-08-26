import Form from "../components/Form.jsx";
import InputGroup from "../components/InputGroup.jsx";
import Input from "../components/Input.jsx";
import Table from "../components/Table.jsx";
import { useParams } from "react-router";
import { useRef, useState } from "react";
import EstabSubmission from "./EstabSubmission.jsx";
import AccountsSubmission from "./AccountsSubmission.jsx";
import CommentBox from "../components/CommentBox.jsx";
// import { user1 } from "../dummy/user.js";
import { ltcInfo } from "../dummy/ltcInfos.js";
import { useEffect } from "react";

export default function ReviewApplication() {
  const { id } = useParams()
  const receiptRef = useRef(null)
  const [ltcData, setLtcData] = useState(ltcInfo[0]);
  const [people, setPeople] = useState(ltcData.peopleInvolved);
  const handleInfo = (json) => {
    setLtcData(json)
    setPeople(json.peopleInvolved)
    console.log("receipt Id")
    for(let receiptId of json.receipts){
      console.log(receiptId)
      addFile(receiptId) 
    }
  }

  const addFile = (id) => {
    const formdata = new FormData()
    formdata.append('fileId', id)
    fetch('/api/getReceipt', {
      method: "POST",
      body: formdata
    }).then(handleBlob)

  }
  // console.log(ltcData)
  const handleBlob = async (res) => {
    console.log(res)
    if(res.status == 200) {
      const blob = await res.blob()
      console.log(blob)
      const url = window.URL.createObjectURL(blob)
      const li = document.createElement('li')
      const a = document.createElement('a')
      const textnode = document.createTextNode("Click to open in new tab file");
      a.appendChild(textnode);
      a.href = url
      a.target = "_blank"
      li.appendChild(a)
      receiptRef.current.appendChild(li)
    }
  }


  useEffect(() => {
    fetch("/api/getLTCInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ltcId: id })
    }).then(res => res.json()).then(handleInfo)
  }, [])

  return (
    <>
      <Form
        onSubmit={() => false}
      >
        <InputGroup >
          <div className=" grid gap-6 mt-4 mb-2 md:grid-cols-2 xl:grid-cols-4">
            <Input
              readOnly
              label={"Name"}
              name="name"
              type="text"
              value={ltcData.user.firstName +" "+ ltcData.user.lastName}
            />
            <Input
              readOnly
              label={"Designation"}
              name="Designation"
              type="text"
              value={ltcData.user.designation}
            />
            <Input
              readOnly
              label={"Date of Joining"}
              name="date"
              type="date"
              value={new Date(ltcData.user.dateOfJoining).toISOString().substring(0, 10)}
            />
            <Input
              readOnly
              label={"Pay Level"}
              name="payLevel"
              type="number"
              value={ltcData.user.payLevel}
            />
          </div>
          <h3 className="font-semibold text-l m-4 text-gray-900">Leave Details</h3>
          <div className=" grid gap-6 mt-4 mb-2 md:grid-cols-2 xl:grid-cols-4">

            <Input
              readOnly
              label={"Earned Leave Availed"}
              name="earnedLeave"
              type="number"
              value={ltcData.earnedLeaveAvailed}
            />
            <Input
              readOnly
              label={"From"}
              name="leaveFrom"
              type="date"
              value={new Date(ltcData.fromDate).toISOString().substring(0, 10)}
            />
            <Input
              readOnly
              label={"To"}
              name="leaveTo"
              type="date"
              value={new Date(ltcData.toDate).toISOString().substring(0, 10)}
            />
          </div>

          <h3 className="font-semibold text-l m-4 text-gray-900">Prefix Details</h3>
          <div className=" grid gap-6 mt-4 mb-2 md:grid-cols-2 xl:grid-cols-4">
            <Input
              readOnly
              label={"From"}
              name="prefixFrom"
              type="date"
              value={ltcData.prefixFrom ? new Date(ltcData.prefixFrom).toISOString().substring(0, 10) : ""}
            />
            <Input
              readOnly
              label={"To"}
              name="prefixTo"
              type="date"
              value={ltcData.prefixTo ? new Date(ltcData.prefixTo).toISOString().substring(0, 10) : ""}
            />
          </div>
          <h3 className="font-semibold text-l m-4 text-gray-900">Suffix Details</h3>
          <div className=" grid gap-6 mt-4 mb-2 md:grid-cols-2 xl:grid-cols-4">
            <Input
              readOnly
              label={"From"}
              name="suffixFrom"
              type="date"
              value={ltcData.suffixFrom ? new Date(ltcData.suffixFrom).toISOString().substring(0, 10) : ""}
            />
            <Input
              readOnly
              label={"To"}
              name="suffixTo"
              type="date"
              value={ltcData.suffixTo ? new Date(ltcData.suffixTo).toISOString().substring(0, 10) : ""}
            />
          </div>

          <div className="flex ml-4 justify-center space-x-10 items-center my-4">
          </div>

          <div className=" grid gap-6 mt-4 mb-2 md:grid-cols-2 xl:grid-cols-4">
            <Input
              readOnly
              label={"Home Town"}
              name="homeTown"
              type="text"
              value={ltcData.user.hometown}
            />
            <Input
              readOnly
              label={"Nature of Visiting Place"}
              name="visitNature"
              type="text"
              value={ltcData.natureOfTravel}
            />
            <Input
              readOnly
              label={"Visiting Place"}
              name="visitPlace"
              type="text"
              value={ltcData.placeToVisit}
            />
            <Input
              readOnly
              label={"Total Estimated Fare"}
              name="estimatedFare"
              type="number"
              value={ltcData.totalEstimatedFare}
            />
          </div>
        </InputGroup>

        <InputGroup>
          <h3 className="font-semibold text-l m-4 text-gray-900">Details of People involved in LTC</h3>
          <Table
            readOnly={true}
            fields={[
              { heading: "Name", type: "text" },
              { heading: "Age", type: "number" },
              { heading: "Relation", type: "text" },
              { heading: "From", type: "text", stateKey: "fromPlace" },
              { heading: "To", type: "text", stateKey: "toPlace" },
              { heading: "Back", type: "checkbox" },
              {
                heading: "Mode Of Travel",
                type: "text",
                stateKey: "modeOfTravel",
              },
            ]}
            data={people}
            setData={setPeople}
          />
          <div className="flex ml-4 justify-center space-x-10 items-center my-4">
            <span className="font-semibold text-gray-900" > Spouse Entitled for LTC</span>
            <Input className="mt-3"
              readOnly
              label={""}
              name="spouseEntitled"
              type="checkbox"
              checked={ltcData.spouseEntitled??false}
            />
            <span className="font-semibold text-gray-900"> Advance Required</span>
            <Input className="mt-3"
              readOnly
              label={""}
              name="advanceRequired"
              type="checkbox"
              checked={ltcData.advanceRequired}
            />
          </div>
          <h3 className="font-semibold text-l m-4 text-gray-900">Details for Encashment of Earned Leave</h3>
          <div className=" grid gap-6 mt-4 mb-2 md:grid-cols-2 xl:grid-cols-4">

            <div className="flex ml-4 justify-center space-x-10 items-center my-4">
              <span className="font-semibold text-gray-900"> Encashment Required</span>
              <Input className="mt-3"
                readOnly
                label={""}
                name="encashment"
                type="checkbox"
                checked={ltcData.encashmentAvailed}
              />
            </div>
            <Input
              readOnly
              label={"No. of Days"}
              name="encashmentDays"
              type="number"
              value={ltcData.encashmentNoOfDays}
            />
          </div>
          <p>
            The information, as given above is true to the best of my knowledge
            and belief{" "}
            <Input name="certification" type="checkbox" checked={true} readOnly />
          </p>
        </InputGroup>
        <div >
          Proofs:
          <ul ref={receiptRef}>

          </ul>
        </div>
      </Form> 
      {/* <EstabSubmission /> */}
      {/* <AccountsSubmission /> */}
      {/* <CommentBox /> */}
    </>
  );
}
