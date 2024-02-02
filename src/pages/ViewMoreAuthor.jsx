import React from "react";
import { Link, useLocation } from "react-router-dom";

const ViewMoreAuthor = () => {
  const use = useLocation();
  const movies = use.state; // data send from ...
  console.log(movies);
  return (
    <div>
      <div className="bg-[#212140] h-screen w-full ">
        <div className="py-28 ">
          <div className="w-full border bg-[#E0D5D5] px-32 py-2">
            <div className="px-32 flex flex-row space-x-6 items-center ">
              <img className="w-[60px]" src={movies.poster_path} />
              <div>
                <div className="text-3xl font-main text-[#f20000]">
                  {movies.title}
                </div>
                <div>Back To main</div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute w-[90%] px-40 mx-16 top-60 ">
          <div className="flex justify-between w-full ">
            <div className="text-white font-bold text-xl my-5 flex space-x-2 ml-20 w-full">
              <div className="flex flex-row w-full ">
                <div className="w-[50%]">
                  <div className="py-5">Cast</div>
                  <div className="space-y-4">
                    {movies?.cast?.map((item) => (
                      <Link
                        to={`/authors/detail/${item.cast_id}`}
                        state={{ from: item }}
                        className="flex flex-row items-center space-x-4"
                      >
                        <img
                          src={item.img_cast}
                          className="h-[80px] w-[80px] rounded"
                        />
                        <p className="text-xl">{item.name_cast}</p>
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="w-[50%] space-y-8">
                  <div>
                    <div className="py-5">Directing</div>
                    <div className="space-y-4">
                      {movies?.directing?.map((item) => (
                        <Link
                          to={`/authors/detail/${item.cast_id}`}
                          state={{ from: item }}
                          className="flex flex-row items-center space-x-4"
                        >
                          <img
                            src={item.img_cast}
                            className="h-[80px] w-[80px] rounded"
                          />
                          <p className="text-xl">{item.name_cast}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="py-5">Production</div>
                    <div className="space-y-4">
                      {movies?.production?.map((item) => (
                        <Link
                          to={`/authors/detail/${item.cast_id}`}
                          state={{ from: item }}
                          className="flex flex-row items-center space-x-4"
                        >
                          <img
                            src={item.img_cast}
                            className="h-[80px] w-[80px] rounded"
                          />
                          <p className="text-xl">{item.name_cast}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMoreAuthor;
