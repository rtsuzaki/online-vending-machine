import React from "react";

const AddToBalanceButton = (props) => {
  return (
    <button type="button" onClick={() => props.addToBalance(props.addedVal)}>
      Add ${props.addedVal}
    </button>
  );
};

export default AddToBalanceButton;
