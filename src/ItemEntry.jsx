import React from "react";

const ItemEntry = (props) => {
  return (
    <div className="item" onClick={() => props.buyItem(props.item)}>

      <div>
        <p className="item-name">{props.item.name}</p>
      </div>

      <div>
        <p>${props.item.price}</p>
      </div>

      <div>
        <p>Qty: {props.item.quantity}</p>
      </div>

    </div>
  );
};

export default ItemEntry;
