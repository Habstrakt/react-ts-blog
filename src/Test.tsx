import React from "react";

type Posts = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
};
export const Test: React.FC<Posts> = ({ id, title, price, imageUrl }) => {
  return (
    <div>
      TEST COMPONENT {id} - {title} - {price} - {imageUrl}
    </div>
  );
};
