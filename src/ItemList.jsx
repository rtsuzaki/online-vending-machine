import React from "react";
import ItemEntry from './ItemEntry.jsx';

const ItemList = (props) => {
  return (
    <div>
      {props.items.map((item) => {
        return <ItemEntry key={item.id} item={item} buyItem={props.buyItem}/>;
      })}
    </div>
  );
};

export default ItemList;
