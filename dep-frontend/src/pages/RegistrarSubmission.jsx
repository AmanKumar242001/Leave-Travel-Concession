import React from 'react'
import CommentBox from "../components/CommentBox.jsx"
import Modal from '../components/Modal.jsx'
import ReviewApplication from './ReviewApplication.jsx'
import { useNavigate,useParams} from "react-router";
import { toast } from "react-hot-toast";

export default function RegistrarSubmission() {

  const { id } =useParams();
  const navigate = useNavigate();


  const handleRegistrarResponse = (res) => {
    if (res.status == 200) {
      navigate("/registrar/pending");
    } else {
      toast("You are not authorized");
    }
  };


  const registrarOnAccept = (e) => {
    const registrarData = {};
    const status = "ACCEPT";
    const registrarComment = document.querySelector('[name="comment"]');
    registrarData["comment"] = registrarComment.value;
    registrarData["status"] = status;
    registrarData["formId"] = id;


    fetch("/api/submitRegistrarData", {
      method: "POST",
      body: JSON.stringify(registrarData),
      headers : {
        'Content-Type': 'application/json'
     },
    }).then(handleRegistrarResponse);

  };

  const registrarOnReview = (e) => {
    const registrarData = {};
    const status = "REVIEW";
    const registrarComment = document.querySelector('[name="comment"]');
    registrarData["comment"] = registrarComment.value;
    registrarData["status"] = status;
    registrarData["formId"] = id;


    fetch("/api/submitRegistrarData", {
      method: "POST",
      body: JSON.stringify(registrarData),
      headers : {
        'Content-Type': 'application/json'
     },
    }).then(handleRegistrarResponse);

  };

  return (
    <div className='max-w-screen-xl mx-auto mt-4'>

    <Modal>
        <ReviewApplication />
      </Modal>
      <CommentBox onAccept={registrarOnAccept} onReview={registrarOnReview}  />
    </div>
    
  )
}
