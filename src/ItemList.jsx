import React from "react";
import ItemEntry from './ItemEntry.jsx';

const ItemList = (props) => {
  return (
    <div>
      {props.items.map((item) => {
        return <ItemEntry key={item.id} item={item} />;
      })}
    </div>
  );
};

export default ItemList;
