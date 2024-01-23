import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { Link } from "react-router-dom";

const Authors = () => {
  const [author, setAuthor] = useState();
  const [data, setData] = useState();
  const [search, setSearch] = useState("");
  console.log(data);

  useEffect(() => {
    onSnapshot(collection(db, "authors"), (snapShot) => {
      let list = [];
      snapShot.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setAuthor(list);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="bg-[#212140] h-screen w-full ">
      <div className="absolute w-[90%] top-36 px-40 mx-16 ">
        <div className="flex justify-between  ">
          <div className="w-[30%] flex p-5 mx-5 "></div>

          <div className="flex justify-center space-x-5 ">
            <form className="py-5 space-x-5 w-full text-right">
              <input
                onChange={(e) => setSearch(e.target.value)}
                className="py-2 px-5 rounded-xl w-[90%] "
              />
            </form>
          </div>
        </div>

        <div className="ml-20 w-full">
          <div className="w-full h-[650px] grid grid-cols-5 gap-6 overflow-y-scroll whitespace-nowrap scrollbar-hide scroll-smooth ">
            {author
              ?.filter((item) => {
                return search.toLowerCase() === ""
                  ? item
                  : item.name_cast
                      .toLowerCase()
                      .includes(search.toLowerCase(search));
              })
              ?.map((item, index) => {
                return (
                  
                  <div key={index}>
                    <Link to={`/authors/detail/${item.id}`} state={{ from: item }}>
                      <button type="submit" onClick={() => setData(item)}>
                        <div className="border-2 border-gray-800 p-4 bg-[#E0D5D5]">
                          <img
                            className="h-[200px] w-[200px]"
                            src={item.img_cast}
                          />
                          <p className="text-[#F20000] font-main text-center">
                            {item.name_cast}
                          </p>
                        </div>
                      </button>
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authors;
