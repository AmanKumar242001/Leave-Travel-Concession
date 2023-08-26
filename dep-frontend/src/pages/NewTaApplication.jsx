import Form from "../components/Form.jsx";
import InputGroup from "../components/InputGroup.jsx";
import Input from "../components/Input.jsx";
import Table from "../components/Table.jsx";
import { useRef, useState } from "react";
import EstabSubmission from "./EstabSubmission.jsx";
import AccountsSubmission from "./AccountsSubmission.jsx";
import CommentBox from "../components/CommentBox.jsx";
import ReviewTaApplication from "./ReviewTaApplication.jsx";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { taInfo } from "../dummy/taInfos.js";
import toast from "react-hot-toast";
import { ltcInfo as ltcdummy } from "../dummy/ltcInfos.js";


export default function NewTaApplication() {
  const [ltcInfo, setLtcInfo] = useState(ltcdummy[0]);
  const { ltcId } = useParams();
  const navigate = useNavigate();
  const imageRef = useRef(null);
  const [peopleInTa, setPeopleInTa] = useState(ltcInfo.peopleInvolved);
  const [journeyDetails, setJourneyDetails] = useState([]);

  const handleInfo = (json) => {
    setLtcInfo(json);
    setPeopleInTa(json.peopleInvolved);
    // setJourneyDetails(json.journeyDetails);
  };

  useEffect(() => {
    fetch("/api/getLTCInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ltcId: ltcId }),
    })
      .then((res) => res.json())
      .then(handleInfo);
  }, []);

  const handleTaRes = (res) => {
    if (res.status == 200) {
      navigate("/applicant/liveTa");
    } else {
      toast("You are not authorized");
    }
  };
  const totalAmount = journeyDetails.reduce(
    (sum, item) => parseInt(sum) + parseInt(item.totalFare),
    0
  );
  const taSubmitHandler = (e) => {
    const arr = [
      "name",
      "empCode",
      "payLevel",
      "Designation",
      "department",
      "date",
      "leaveFrom",
      "leaveTo",
      "advanceDrawnAmount",
      "advanceDrawnDate",
      "accountNo",
      "totalAmount",
      "certification",
    ];

    const taFormData = { ltcId: ltcId };
    const inputs = e.target.querySelectorAll("input");
    // formData['name'] = inputs[0].value;
    for (let i = 0; i < 13; i++) {
      taFormData[arr[i]] = inputs[i].value;
    }
    taFormData["peopleInvolved"] = peopleInTa;
    taFormData["journeyDetails"] = journeyDetails;
    taFormData["stageCurrent"] = 1;
    taFormData["stageRedirect"] = null;
    // a =
    let fd = new FormData();
    fd.append("json", JSON.stringify(taFormData));
    for (let image of imageRef.current.files) {
      fd.append("file", image);
    }

    fetch("/api/createNewTAApplication", {
      method: "POST",
      body: fd,
    }).then(handleTaRes);
  };
  let advanceTotal = 0;
  if(ltcInfo.advanceRequired) advanceTotal = 0.9 * ltcInfo.expectedJourneyDetails.reduce((sum, item) => sum + item.singleFare * item.noOfFares, 0)
  return (
    <div className="bg-yellow-50">
      <div className="max-w-screen-xl mx-auto">
        <h3 className="font-semibold text-xl text-gray-900 p-4 flex">
          New TA Application
        </h3>
        <Form onSubmit={taSubmitHandler}>
          <InputGroup>
            <div className="m-4 grid gap-6 mb-1 md:grid-cols-2 xl:grid-cols-4">
              <Input
                label={"Name"}
                name="name"
                type="text"
                value={ltcInfo.user.firstName + ltcInfo.user.lastName}
                required
              />
              {/* <Input label={"Emp. Code"} name="empCode" type="number" value={ltcInfo.user.id} /> */}
              <Input
                label={"Pay Level"}
                name="payLevel"
                type="number"
                value={ltcInfo.user.payLevel}
                required
              />
              <Input
                label={"Designation"}
                name="Designation"
                type="text"
                value={ltcInfo.user.designation}
                required
              />
              <Input
                label={"Department"}
                name="department"
                type="text"
                value={ltcInfo.user.department}
                required
              />
              <Input
                label={"Date of Joining"}
                name="date"
                type="date"
                value={new Date(ltcInfo.user.dateOfJoining)
                  .toISOString()
                  .substring(0, 10)}
                required
              />
            </div>
            <h3 className="font-semibold text-l text-gray-900 m-4 flex">
              Leave Details
            </h3>
            <div className="m-4 grid gap-6 mb-1 md:grid-cols-2 xl:grid-cols-4">
              {" "}
              {/* <Input label={"Earned Leave Availed"} name="earnedLeave" type="number" /> */}
              <Input
                label={"From"}
                name="leaveFrom"
                type="date"
                value={new Date(ltcInfo.fromDate)
                  .toISOString()
                  .substring(0, 10)}
                required
              />
              <Input
                label={"To"}
                name="leaveTo"
                type="date"
                value={new Date(ltcInfo.toDate).toISOString().substring(0, 10)}
                required
              />
              {/* <h3>Prefix Details</h3>
            <Input label={"From"} name="prefixFrom" type="date" />
            <Input label={"To"} name="prefixTo" type="date" />
            <h3>Suffix Details</h3>
            <Input label={"From"} name="suffixFrom" type="date" />
            <Input label={"To"} name="suffixTo" type="date" /> */}
              {/* <Input
              label={"Spouse Entitled for LTC"}
              name="spouseEntitled"
              type="checkbox"
            /> */}
              <Input
                label={"Advance Drawn"}
                name="advanceRequired"
                type="number"
                value={advanceTotal}
                disabled={!ltcInfo.advanceRequired}
              />
              <Input
                label={"Advance Drawn Date"}
                name="advanceDrawnDate"
                type="date"
                required={ltcInfo.advanceRequired}
                disabled={!ltcInfo.advanceRequired}
              />
              {/* <Input label={"Home Town"} name="homeTown" type="text" /> */}
              {/* <Input
                label={"Bank Account No. (SBI/Any other):"}
                name="accountNo"
                type="number"
                value={ltcInfo.accountNo}
              /> */}
              {/* <Input
              label={"Nature of Visiting Place"}
              name="visitNature"
              type="text"
            />
            <Input label={"Visiting Place"} name="visitPlace" type="text" />
            <Input
              label={"Total Estimated Fare"}
              name="estimatedFare"
              type="number"
            /> */}
            </div>
          </InputGroup>

          <InputGroup>
            <h3 className="font-semibold text-l text-gray-900 m-4 flex">
              Particulars of the claimant and family in respect of whom the
              Leave Travel Concession has been claimed:
            </h3>
            <Table
              fields={[
                { heading: "Name", type: "text" },
                { heading: "Age", type: "number" },
                { heading: "Relation", type: "text" },
                // { heading: "From", type: "text" },
                // { heading: "To", type: "text" },
                // { heading: "Back", type: "checkbox" },
                // { heading: "Mode Of Travel", type: "text" },
              ]}
              data={peopleInTa}
              setData={setPeopleInTa}
            />
            {/* <Input
              label={"Advance Required"}
              name="advanceRequired"
              type="checkbox"
            />
            <h3>Details for Encashment of Earned Leave</h3>
            <Input
              label={"Encashment Required"}
              name="encashment"
              type="checkbox"
            />
            <Input label={"No. of Days"} name="encashmentDays" type="number" /> */}

            <h3 className="font-semibold text-l text-gray-900 m-4 flex">
              Details of journey(s) performed by Government Employee and the
              members of his/her family:
            </h3>
            <Table
              fields={[
                {
                  heading: "Departure Date",
                  type: "date",
                  stateKey: "departureDate",
                },
                {
                  heading: "Departure From",
                  type: "text",
                  stateKey: "departureFrom",
                },
                {
                  heading: "Arrival Date",
                  type: "date",
                  stateKey: "arrivalDate",
                },
                { heading: "Arrival To", type: "text", stateKey: "arrivalTo" },
                {
                  heading: "Distance in Kms",
                  type: "number",
                  stateKey: "distance",
                },
                {
                  heading: "Mode Of Travel",
                  type: "text",
                  stateKey: "modeOfTravel",
                },
                {
                  heading: "Class of Travel",
                  type: "text",
                  stateKey: "classOfTravel",
                },
                {
                  heading: "No. of Fares",
                  type: "number",
                  stateKey: "noOfFares",
                },
                {
                  heading: "Total Fare Paid",
                  type: "number",
                  stateKey: "totalFare",
                },
                {
                  heading: "Ticket No./PNR/Remarks",
                  type: "text",
                  stateKey: "ticketNo",
                },
              ]}
              data={journeyDetails}
              setData={setJourneyDetails}
            />
            <div className="m-4 grid gap-6 mb-1 md:grid-cols-2 xl:grid-cols-4">
              <Input
                label={"Total"}
                name="totalAmount"
                type="number"
                value={totalAmount}
              />
            </div>
            <input ref={imageRef} name="file" type="file" multiple />
            <h3 className="font-semibold text-l text-gray-900 m-4 flex">
              CERTIFIED THAT:
            </h3>
            <div className="flex ml-4 justify-start space-x-10 items-center my-8">
              <p className="font-semibold">
                The information, as given above is true to the best of my
                knowledge and belief
              </p>
              <Input name="certification" type="checkbox" required />
            </div>
            <div className="flex ml-4 justify-center space-x-10 items-center py-4">
              <Input
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                type="submit"
              />
            </div>
          </InputGroup>
        </Form>
        {/* <EstabSubmission /> */}
        {/* <AccountsSubmission /> */}
        {/* <CommentBox /> */}

        {/* <ReviewTaApplication /> */}
      </div>
    </div>
  );
}
