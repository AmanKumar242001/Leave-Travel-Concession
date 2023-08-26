import React from "react";
import CommentBox from "../components/CommentBox.jsx";
import Modal from "../components/Modal.jsx";
import ReviewTaApplication from "./ReviewTaApplication.jsx";
import { useNavigate, useParams } from "react-router-dom";
import Form from "../components/Form.jsx";
import { toast } from "react-hot-toast";
import ListComment from "../components/ListComment.jsx";

export default function ShowUserTaApplication() {
  const { id } = useParams();

  return (
    <>
      <div className="max-w-screen-lg mx-auto py-4">
        <div className="pb-8">
          <ListComment />
          {/* <CommentBox readOnly /> */}
        </div>
        <Modal title={"View TA Application"}>
          <ReviewTaApplication />
        </Modal>
      </div>
    </>
  );
}
