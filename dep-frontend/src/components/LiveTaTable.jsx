import React, { useState } from "react";
import { Link } from "react-router-dom";
// import Modal from "./Modal"
// import AdminForm from "./AdminForm";

let stageName = [
  "Sent Back",
  "Pending HOD",
  "Pending Establishment Jr.Assistant",
  "Pending Establishment Superintendent",
  "Pending Establishment DR",
  "Pending Accounts JAA",
  "Pending Accounts AO",
  "Pending Accounts DR",
  "Pending Audit DA",
  "Pending Audit AO",
  "Pending Sr.Audit Officer",
  "Pending Registrar",
  "Pending Dean",
];

function LiveTaTable(props) {

  const handleNameChange = (e) => {
    setNameFilter(e.target.value)
  }
  const handleEmailChange = (e) => {
    setEmailFilter(e.target.value)
  }
  const handleOrderChange = (e) => {
    setSortOrder(e.target.value)
  }
  const [nameFilter, setNameFilter] = useState('')
  const [emailFilter, setEmailFilter] = useState('')
  const [sortOrder, setSortOrder] = useState(-1)
  const filterData = [...props.data].sort((a, b) => (new Date(a.fillDate) - new Date(b.fillDate)) * sortOrder).filter(item => (item.user.firstName + " " + item.user.lastName).includes(nameFilter)).filter(item => item.user.emailId.includes(emailFilter))

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-w-screen-xl mx-auto">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="2xl:text-lg text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="px-6 py-3">Application Id</th>
            {/* <th>User Email</th>
            <th>Name</th> */}
            <th className="flex-col pb-4 px-6 py-3">
            <div>Created On</div>
            <select className="text-lg font-medium bg-blue-200 rounded-md" onChange={handleOrderChange}>
                  <option className="bg-white" value={-1}> Newest First </option>
                  <option className="bg-white" value={1}> Oldest First </option>
                </select></th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Form</th>
          </tr>
        </thead>
        {filterData.map((item) => {
          return (
            <tbody key={Math.random()}>
              <tr className="bg-white border-b">
                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {item.id}
                </th>
                {/* <td>{item.user.emailId}</td>
                <td>{item.user.firstName + " " + item.user.lastName}</td> */}
                <td className="px-6 py-4">{new Date(item.fillDate)
                  .toISOString()
                  .substring(0, 10)}</td>
                <td className="px-6 py-4">{stageName[item.stageCurrent]}</td>
                <td className="px-6 py-4">
                  <Link
                    to={`/applicant/viewTa/${item.id}`}
                    className="text-blue-500 font-semibold"
                  >
                    View TA Application
                  </Link>
                </td>
                {/* <td >
              <Modal>
                  <AdminForm itemIndex={itemIndex}/>
              </Modal>
                  </td> */}
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
}

export default LiveTaTable;
