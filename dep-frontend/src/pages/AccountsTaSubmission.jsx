import React from "react";
import CommentBox from "../components/CommentBox.jsx";
import Modal from "../components/Modal.jsx";
import ReviewTaApplication from "./ReviewTaApplication.jsx";
import AccountsTaTable from "../components/AccountsTaTable.jsx";
import Input from "../components/Input.jsx";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-hot-toast";

export default function AccountsTaSubmission() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleAccountsTaResponse = (res) => {
    if (res.status == 200) {
      navigate("/accounts/pendingTa");
    } else {
      toast("You are not authorized");
    }
  };

  const accountsOnTaAccept = (e) => {
    const accountsTaData = {};
    const status = "ACCEPT";
    const accountsTaAirFare = document.querySelector('[name="airFare"]');
    const accountsTaTrainFare = document.querySelector('[name="trainFare"]');
    const accountsTaBusFare = document.querySelector('[name="busFare"]');
    const accountsTaOtherFare = document.querySelector('[name="otherFare"]');
    const accountsTaTotalFare = document.querySelector('[name="totalFare"]');
    const accountsTaAdvanceDeduction = document.querySelector(
      '[name="advanceDeduction"]'
    );
    const accountsTaNetReimbursement = document.querySelector(
      '[name="netReimbursement"]'
    );
    const accountsTaComment = document.querySelector('[name="comment"]');
    const accountsTaPassedPayment = document.querySelector(
      '[name="passedPayment"]'
    );
    const titleInAccountsTa = document.querySelector('[name="title"]');
    accountsTaData["airFare"] = accountsTaAirFare.value;
    accountsTaData["trainFare"] = accountsTaTrainFare.value;
    accountsTaData["busFare"] = accountsTaBusFare.value;
    accountsTaData["otherFare"] = accountsTaOtherFare.value;
    accountsTaData["totalFare"] = accountsTaTotalFare.value;
    accountsTaData["advanceDeduction"] = accountsTaAdvanceDeduction.value;
    accountsTaData["netReimbursement"] = accountsTaNetReimbursement.value;
    accountsTaData["passedPayment"] = accountsTaPassedPayment.value;
    accountsTaData["title"] = titleInAccountsTa.value;
    accountsTaData["status"] = status;
    accountsTaData["formId"] = id;
    accountsTaData["comment"] = accountsTaComment.value;

    fetch("/api/submitTAAccountsData", {
      method: "POST",
      body: JSON.stringify(accountsTaData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(handleAccountsTaResponse);
  };

  const accountsOnTaReview = (e) => {
    const accountsTaData = {};
    const status = "REVIEW";
    const accountsTaAirFare = document.querySelector('[name="airFare"]');
    const accountsTaTrainFare = document.querySelector('[name="trainFare"]');
    const accountsTaBusFare = document.querySelector('[name="busFare"]');
    const accountsTaOtherFare = document.querySelector('[name="otherFare"]');
    const accountsTaTotalFare = document.querySelector('[name="totalFare"]');
    const accountsTaAdvanceDeduction = document.querySelector(
      '[name="advanceDeduction"]'
    );
    const accountsTaNetReimbursement = document.querySelector(
      '[name="netReimbursement"]'
    );
    const accountsTaComment = document.querySelector('[name="comment"]');
    const accountsTaPassedPayment = document.querySelector(
      '[name="passedPayment"]'
    );
    const titleInAccountsTa = document.querySelector('[name="title"]');
    accountsTaData["airFare"] = accountsTaAirFare.value;
    accountsTaData["trainFare"] = accountsTaTrainFare.value;
    accountsTaData["busFare"] = accountsTaBusFare.value;
    accountsTaData["otherFare"] = accountsTaOtherFare.value;
    accountsTaData["totalFare"] = accountsTaTotalFare.value;
    accountsTaData["advanceDeduction"] = accountsTaAdvanceDeduction.value;
    accountsTaData["netReimbursement"] = accountsTaNetReimbursement.value;
    accountsTaData["passedPayment"] = accountsTaPassedPayment.value;
    accountsTaData["title"] = titleInAccountsTa.value;
    accountsTaData["status"] = status;
    accountsTaData["formId"] = id;
    accountsTaData["comment"] = accountsTaComment.value;

    fetch("/api/submitTAAccountsData", {
      method: "POST",
      body: JSON.stringify(accountsTaData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(handleAccountsTaResponse);
  };

  return (
    <>
      <div className="max-w-screen-xl mx-auto">
        <h3 className="font-semibold text-xl text-gray-900 m-4 flex mx-auto">
          For use by the Accounts Section
        </h3>
        <Modal>
          <ReviewTaApplication />
        </Modal>

        <AccountsTaTable />

        <div
          className="m-4 grid gap-6 mb-1 md:grid-cols-2 
xl:grid-cols-4"
        >
          {/* <Input
        label={"Passed for payment of Rs/-"}
        name="passedPayment"
        type="number"
        /> */}
          {/* <Input label={"Debitable to"} name="title" type="text" /> */}
        </div>

        <CommentBox
          onAccept={accountsOnTaAccept}
          onReview={accountsOnTaReview}
        />
      </div>
    </>
  );
}
