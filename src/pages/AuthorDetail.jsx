import React from "react";
import { useLocation } from "react-router-dom";

const AuthorDetail = () => {
  const use = useLocation();
  const movie = use.state.from;
  console.log(movie);
  return (
    <div className="bg-[#212140] h-full w-full ">
      <div className="w-[90%] top-24 px-40 pt-20 mx-20 ">
        <div className="flex justify-between  ">
          <div className="text-white font-bold text-xl my-5 flex space-x-2 ml-20 w-full justify-center ">
            <p className=" text-center font-body text-[#F20000] text-2xl">
              Overwiew
            </p>
          </div>
        </div>
        <div className=" w-full pt-5 flex flex-row">
          <div className="w-[30%] h-full border">
            <div className="h-full w-full flex justify-center">
              <img
                className="w-[300px] h-[440px] rounded-lg"
                src={movie?.img_cast}
              />
            </div>
            <div className="text-white ml-10 space-y-6 mt-5 ">
              <h1 className="font-body">Personal Info</h1>
              <div>
                <p className="font-main">Known For</p>
                <p className="text-gray-400">{movie?.role}</p>
              </div>
              <div>
                <p className="font-main">Gender</p>
                <p className="text-gray-400">{movie?.gender}</p>
              </div>
              <div>
                <p className="font-main">Birthday</p>
                <p className="text-gray-400">{movie?.birthday}</p>
              </div>
              <div>
                <p className="font-main">Place of Birth</p>
                <p className="text-gray-400">{movie?.pob}</p>
              </div>
            </div>
          </div>
          <div className="w-[70%] border text-white">
            <div className="pt-5 pl-10 space-y-6">
              <h1 className="font-main text-3xl">{movie?.name_cast}</h1>
              <div>
                <p className="text-xl">Biography</p>
                <p className="text-gray-400">{movie?.role}</p>
              </div>
              <div>
                <p className="font-main">Known For</p>
                <p className="text-gray-400 flex flex-row space-x-8 py-3">
                  {movie?.movies?.map((item, index) => (
                    <div className="text-clip overflow-hidden">
                      <img
                        className="w-[130px] h-[190px] "
                        src={item.poster_path}
                      />
                      <p className="text-clip overflow-hidden ">{}</p>
                    </div>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorDetail;
