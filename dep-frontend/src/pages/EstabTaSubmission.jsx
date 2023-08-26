import React from 'react'
import EstabTaTable from '../components/EstabTaTable'
import ReviewTaApplication from './ReviewTaApplication'
import CommentBox from '../components/CommentBox'
import Modal from "../components/Modal";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-hot-toast";


export default function EstabTaSubmission() {

  const { id } = useParams();
  const navigate = useNavigate();

  const handleEstabTaResponse = (res) => {
    if (res.status == 200) {
      navigate("/establish/pendingTa");
    }
    else {
      toast("You are not authorized");
    }
  }

  const estabOnTaAccept = (e) => {

    const estabTaData = {};
    const status = "ACCEPT";
    const estabTaComment = document.querySelector('[name="comment"]');
    estabTaData["comment"] = estabTaComment.value;
    estabTaData["status"] = status;
    estabTaData["formId"] = id;



  
    fetch("/api/submitTAEstabData",{
      method:"POST",
      body:JSON.stringify(estabTaData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(handleEstabTaResponse);

  }

  const estabOnTaReview = (e) => {

    const estabTaData = {};
    const status = "REVIEW";
    const estabTaComment = document.querySelector('[name="comment"]');
    estabTaData["comment"] = estabTaComment.value;
    estabTaData["status"] = status;
    estabTaData["formId"] = id;



  fetch("/api/submitTAEstabData",{
    method:"POST",
    body:JSON.stringify(estabTaData),
    headers : {
      'Content-Type': 'application/json'
   },
  }).then(handleEstabTaResponse);

  }

  return (
    <>
      <div className="max-w-screen-xl mx-auto mt-4">
        <h3>FOR USE OF ESTABLISHMENT SECTION</h3>
        <Modal>
          <ReviewTaApplication />
        </Modal>
        <EstabTaTable />
        <CommentBox onAccept={estabOnTaAccept} onReview={estabOnTaReview} />
      </div>
    </>
  )
}
