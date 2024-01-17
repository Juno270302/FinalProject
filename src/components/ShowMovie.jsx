import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const ShowMovie = ({ item }) => {
  return (
    <div className="w-[340px] inline-block cursor-pointer relative p-2  ">
      <Link to={`/detail/${item.id}`} state={{ from: item}}>
        <img
          className="w-full h-auto"
          src={item?.backdrop_path}
          alt={item?.title}
        />

        <div className="absolute top-0 left-0 w-full h-full text-white">
          <div className="white-space-normal text-xs md:text-sm font-bold flex justify-start items-end pb-2  w-[97.6%] h-full ">
            <p className=" bg-black/60 w-full py-4 px-3 ml-2">{item?.title}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ShowMovie;
