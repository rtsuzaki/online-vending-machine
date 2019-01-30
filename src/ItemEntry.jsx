import React from "react";

const ItemEntry = (props) => {
  return (
    <div className="item" onClick={() => props.buyItem(props.item)}>
      
      <div>
        The item id is:
        {props.item.id}
      </div>
      <div>
        The item name is:
        {props.item.name}
      </div>
      <div>
        The item price is:
        {props.item.price}
      </div>
      <div>
        The item quantity is:
        {props.item.quantity}
      </div>

    </div>
  );
};

export default ItemEntry;
