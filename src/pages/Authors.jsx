import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { Link } from "react-router-dom";

const Authors = () => {
  const [author, setAuthor] = useState();
  const [data, setData] = useState();
  const [search, setSearch] = useState("");
  const [roleAuthor, setRoleAuthor] = useState([]);
  const [role, setRole] = useState(null)
  console.log(role)

  useEffect(() => {
    onSnapshot(collection(db, "authors"), (snapShot) => {
      let list = [];
      snapShot.docs.forEach((doc) => {
        list.push({ id_cast: doc.id, ...doc.data() });
      });
      setAuthor(list);
    });
  }, []);

  useEffect(() => {
    onSnapshot(collection(db, "role"), (snapShot) => {
      let list = [];
      snapShot.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setRoleAuthor(list);
    });
  }, []);

  return (
    <div className="bg-[#212140] h-screen w-full">
      <div className="w-[90%] h-full py-36 px-40 mx-16 ">
        <div className="flex justify-between ml-20 ">
          <div className="flex p-5 text-white float-right ">
            
          </div>
          <div className="flex p-5 text-black float-right w-[1130px]">
            <select className="w-full rounded" onChange={(e) => setRole(e.target.value)}>
              <option>All</option>
              {roleAuthor.map((item, index) => (
                <option key={index}>{item.key}</option>
              ))}
            </select>
          </div>

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
          <div className="w-full grid grid-cols-5 gap-6  ">
            {author
              ?.filter((item) => {
                if (role === "All" || role === null) {
                  return item;
                } else {
                  return item.role.includes(role);
                }
              })
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
                    <Link
                      to={`/authors/detail/${item.id}`}
                      state={{ from: item }}
                    >
                      <button type="submit" onClick={() => setData(item)}>
                        <div className="border-2 border-gray-800 p-4 bg-[#E0D5D5]/30 rounded-xl">
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
