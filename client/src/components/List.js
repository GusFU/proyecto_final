import React from "react";

const List = ({ items }) => {
  return (
    <div>
      {items.map(item => (
        <img class="logo1" src={"../images"+item} width="150" />
      ))}
    </div>
  );
};

export default List;