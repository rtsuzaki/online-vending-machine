import React from "react";

const AddToBalanceButton = (props) => {
  return (
    <button type="button" className="add-button" onClick={() => props.addToBalance(props.addedVal)}>
      Add ${props.addedVal}
    </button>
  );
};

export default AddToBalanceButton;
