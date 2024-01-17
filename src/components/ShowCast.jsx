import React from "react";

const ShowCast = ({ item }) => {
  return (
    <div className="w-[260px] h-[300px] inline-block cursor-pointer p-3 bg-[#0B0F29]  ">
      <img className="w-full h-[250px]" src={item.img_cast} />
      <p className="text-center text-lg text-white">{item.name_cast}</p>
    </div>
  );
};

export default ShowCast;
