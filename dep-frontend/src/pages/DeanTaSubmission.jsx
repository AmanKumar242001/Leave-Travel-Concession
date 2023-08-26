import React from 'react'
import CommentBox from "../components/CommentBox.jsx"
import Modal from '../components/Modal.jsx'
import ReviewTaApplication from './ReviewTaApplication.jsx'
import { useNavigate,useParams} from "react-router";
import { toast } from "react-hot-toast";

export default function DeanTaSubmission() {

  const { id } =useParams();
  const navigate = useNavigate();


  const handleDeanTaResponse = (res) => {
    if (res.status == 200) {
      navigate("/dean/pendingTa");
    } else {
      toast("You are not authorized");
    }
  };


  const deanOnTaAccept = (e) => {
    const deanTaData = {};
    const status = "ACCEPT";
    const deanTaComment = document.querySelector('[name="comment"]');
    deanTaData["comment"] = deanTaComment.value;
    deanTaData["status"] = status;
    deanTaData["formId"] = id;


    fetch("/api/submitTADeanData", {
      method: "POST",
      body: JSON.stringify(deanTaData),
      headers : {
        'Content-Type': 'application/json'
     },
    }).then(handleDeanTaResponse);

  };

  const deanOnTaReview = (e) => {
    const deanTaData = {};
    const status = "REVIEW";
    const deanTaComment = document.querySelector('[name="comment"]');
    deanTaData["comment"] = deanTaComment.value;
    deanTaData["status"] = status;
    deanTaData["formId"] = id;


    fetch("/api/submitTADeanData", {
      method: "POST",
      body: JSON.stringify(deanTaData),
      headers : {
        'Content-Type': 'application/json'
     },
    }).then(handleDeanTaResponse);

  };

  return (
    <div className='max-w-screen-xl mx-auto mt-4'>
    <Modal>
        <ReviewTaApplication />
      </Modal>
      <CommentBox  onAccept={deanOnTaAccept} onReview={deanOnTaReview}   />
    </div>
    
  )
}
