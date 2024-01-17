import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../firebase";
import NavbarAuthor from "./NavbarAuthor";

const ChooseAuthor = ({ item, movie }) => {
  const [data, setData] = useState("");
  const [search, setSearch] = useState("");
  console.log(search);

  const movieID = doc(db, "movies", `${movie.id}`);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateDoc(movieID, {
      cast: arrayUnion({
        id_cast: data?.id,
        name_cast: data?.name_cast,
        img_cast: data?.img_cast,
        gender: data?.gender,
        birthday: data?.birthday,
        pob: data?.pob,
      }),
    });
  };

  return (
    <div className="w-full h-full bg-[#212140]">
      <div className="w-full px-20 py-20 flex flex-row">
        <NavbarAuthor movie={movie} data={data} />
        <div className="max-w-[950px] h-full mx-auto bg-[#553E58] rounded-3xl text-white ">
          <div className="w-full h-full p-7 ">
            <div className="flex w-full  items-center justify-center  ">
              <div className=" w-[60%]  h-full ">
                <h1 className="font-bold text-4xl text-white  flex float-right py-2">
                  Add Author
                </h1>
              </div>
              <div className=" w-[40%] h-full">
                <input
                  className="py-1 px-5 rounded-xl w-[50%] text-black flex float-right mt-2"
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search Contacts"
                />
              </div>
            </div>
            <div className="w-full h-[650px] border-gray-800 border-2 grid grid-cols-4 gap-6 overflow-y-scroll whitespace-nowrap scrollbar-hide scroll-smooth ">
              {item?.filter((item) => {
                  return search.toLowerCase() === ""
                    ? item
                    : item.name_cast.toLowerCase().includes(search);
                })
                ?.map((item) => {
                  return (
                    <form key={item.id_cast} onSubmit={handleSubmit}>
                      <button type="submit" onClick={() => setData(item)}>
                        <div className="border-2 border-gray-800">
                          <img
                            className="h-[200px] w-[200px]"
                            src={item.img_cast}
                          />
                          <p>{item.name_cast}</p>
                        </div>
                      </button>
                    </form>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseAuthor;
