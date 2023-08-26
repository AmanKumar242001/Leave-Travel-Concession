import React from "react";
export default function Form(props) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if(props.onSubmit) props.onSubmit(e);
        // const formData = new FormData(e.target);
        // for (const data of formData.entries()) {
        // }
      }}
    >
      {props.children}
    </form>
  );
}
