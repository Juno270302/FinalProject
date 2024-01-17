import React from "react";
import { FaStar } from "react-icons/fa6";
import { BsDot } from "react-icons/bs";
import { CiPlay1 } from "react-icons/ci";
import { FaRegDotCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const ImageMain = ({ movie }) => {
  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };
  return (
    <div className="w-full h-[550px] ">
      <div className="absolute w-full h-[550px] px-32"></div>
      <img
        className="w-full h-full object-cover"
        src={movie?.backdrop_path}
        alt={movie?.title}
      />
      <div className="absolute top-[15%] left-[5%] p-4 md:p-8 space-y-5 ">
        <div className="flex space-x-3 text-xl">
          <p className="flex space-x-2">
            <FaStar className="mt-0.5 text-red-400" />
            <p>7.5</p>
          </p>
          <BsDot className="mt-1 " />
          <p>{movie?.release_date}</p>
          <BsDot className="mt-1 " />
          <p>{movie?.language}</p>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold ">{movie?.title}</h1>
        <p className="w-[50%] md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%]">
          {truncateString(movie?.overview, 150)}
        </p>
        <div className="space-x-7 ml-4 flex">
          <Link to={`/detail/${movie?.id}`} state={{ from: movie }}>
            <button className="rounded-3xl bg-[#ff99be]/90 py-2 px-5 flex space-x-1 text-white ">
              <p>
                <CiPlay1 className="mt-1" />
              </p>
              <p>Watch</p>
            </button>
          </Link>

          <button className=" text-white bg-slate-500/90 rounded-3xl py-2 px-5 ml-5 flex space-x-2">
            <p>
              <FaRegDotCircle className="mt-1" />
            </p>
            <p>Add to List</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageMain;
