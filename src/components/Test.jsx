import { collection, doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";

const Test = ({ item, index }) => {
  

  return (
    <Link to={`/detail/${item.id}`} state={{ from: item }}>
      <div className="max-w-[130px]">
        <img className="w-[130px] h-[190px] " src={item.poster_path} />
        <p className="text-center">{item?.title}</p>
      </div>
    </Link>
  );
};

export default Test;
