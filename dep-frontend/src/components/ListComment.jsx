import React, { useEffect, useState } from "react";
import Input from "./Input";
import { json, useLocation, useParams } from "react-router";

export default function ListComment() {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const commentEndpoint = location.pathname.includes("Ta")
      ? "/api/getTAComments"
      : "/api/getComments";
    fetch(commentEndpoint, {
      method: "POST",
      body: JSON.stringify({ id: id }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(setComments);
  }, []);
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-green-300">
        <table className="w-full text-left text-gray-500">
          <thead className="text-gray-700 uppercase bg-gray-50">
            {comments.length != 0 ? (
              <tr>
                <th scope="col" className="px-6 py-1">
                  Commentor
                </th>
                <th scope="col" className="px-6 py-1">
                  Comment
                </th>
              </tr>
            ): <></>}
          </thead>
          <tbody>
            {comments.map((comment) => (
              <tr className="bg-white border-b">
                <th
                  scope="row"
                  className="px-6 py-1 text-base font-medium text-gray-900 whitespace-nowrap"
                >
                  {`${comment.handler.designation}`}
                </th>
                <td className="px-6 py-1 text-base">{`${comment.comment}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
