import React from "react";
import CommentBox from "../components/CommentBox.jsx";
import Modal from "../components/Modal.jsx";
import ReviewApplication from "./ReviewApplication.jsx";
import { useNavigate, useParams } from "react-router-dom";
import Form from "../components/Form.jsx";
import { toast } from "react-hot-toast";
import ListComment from "../components/ListComment.jsx";

export default function HodSubmission() {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleHodResponse = (res) => {
    if (res.status == 200) {
      navigate("/hod/pending");
    } else {
      toast("You are not authorized");
    }
  };

  const hodOnAccept = (e) => {
    const hodData = {};
    const status = "ACCEPT";
    const hodComment = document.querySelector('[name="comment"]');
    hodData["comment"] = hodComment.value;
    hodData["status"] = status;
    hodData["formId"] = id;

    fetch("/api/submitHodData", {
      method: "POST",
      body: JSON.stringify(hodData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(handleHodResponse);
  };

  const hodOnReview = (e) => {
    const hodData = {};
    const status = "REVIEW";
    const hodComment = document.querySelector('[name="comment"]');
    hodData["comment"] = hodComment.value;
    hodData["status"] = status;
    hodData["formId"] = id;

    fetch("/api/submitHodData", {
      method: "POST",
      body: JSON.stringify(hodData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(handleHodResponse);
  };

  return (
    <div>
      <div className="max-w-screen-xl mx-auto pt-4">
        <Form>
          <Modal>
            <ReviewApplication />
          </Modal>
          <ListComment />
          <CommentBox onAccept={hodOnAccept} onReview={hodOnReview} />
        </Form>
      </div>
    </div>
  );
}
