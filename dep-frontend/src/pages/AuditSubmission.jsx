import React from 'react'
import CommentBox from "../components/CommentBox.jsx"
import Modal from '../components/Modal.jsx'
import ReviewApplication from './ReviewApplication.jsx'
import { useNavigate,useParams} from "react-router";
import { toast } from "react-hot-toast";

export default function AuditSubmission() {
  const { id } =useParams();
  const navigate = useNavigate();

  const handleAuditResponse = (res) => {
    if (res.status == 200) {
      navigate("/audit/pending");
    } else {
      toast("You are not authorized");
    }
  };


  const auditOnAccept = (e) => {
    const auditData = {};
    const status = "ACCEPT";
    const auditComment = document.querySelector('[name="comment"]');
    auditData["comment"] = auditComment.value;
    auditData["status"] = status;
    auditData["formId"] = id;


    fetch("/api/submitAuditData", {
      method: "POST",
      body: JSON.stringify(auditData),
      headers : {
        'Content-Type': 'application/json'
     },
    }).then(handleAuditResponse);

  };

  const auditOnReview = (e) => {
    const auditData = {};
    const status = "REVIEW";
    const auditComment = document.querySelector('[name="comment"]');
    auditData["comment"] = auditComment.value;
    auditData["status"] = status;
    auditData["formId"] = id;


    fetch("/api/submitAuditData", {
      method: "POST",
      body: JSON.stringify(auditData),
      headers : {
        'Content-Type': 'application/json'
     },
    }).then(handleAuditResponse);

  };


  return (
    <>
      <div className="max-w-screen-xl mx-auto">
      <br></br>
    <Modal>
        <ReviewApplication />
      </Modal>
      <br></br>
      <CommentBox onAccept={auditOnAccept} onReview={auditOnReview} />
      </div>
    </>
    
  )
}
