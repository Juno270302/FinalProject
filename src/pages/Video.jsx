import React from "react";
import { Link, useLocation } from "react-router-dom";
import { IoReturnDownBack } from "react-icons/io5";

const Video = () => {
  const use = useLocation();
  const movie = use.state;
  console.log(movie)
  return (
    <div className="w-full h-screen bg-[#212140] ">
      <div className="px-52 py-16 w-full h-full">
        <div className=" w-full h-full mt-5">
          <Link to={`/detail/${movie.id}`} state={{from : movie}}>
            <div className="py-5 pl-10 text-3xl text-white flex items-center space-x-2">
              <IoReturnDownBack />
              <p>{movie.title}</p>
            </div>
          </Link>
          <div>
            <video width="1250" className="mx-auto" controls>
              <source src={movie.video.video}  type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;
