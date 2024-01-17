import React, { useEffect, useState } from "react";
import NavbarAccount from "../components/NavbarAccount";
import { UserAuth } from "../context/AuthContext";
import { doc, limit, onSnapshot} from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { FaEye } from "react-icons/fa";

const History = () => {
  const { user } = UserAuth();
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user.uid}`), (doc) => {
      setMovie(doc.data()?.historyShow);
    });
    
  }, [user?.uid]);

  return (
    <div className="w-full bg-[#212140]">
      <div className="w-full px-10 py-40 flex flex-row ">
        <NavbarAccount bg={"bgHistory"} />
        <div className="max-w-[1200px] w-full h-[600px] mx-auto bg-[#553E58] rounded-2xl text-white border border-gray-500">
          <div className="w-full p-7 ">
            <h1 className="font-bold text-4xl text-white text-center pt-3 pb-6">
              History
            </h1>
            <div className=" w-full h-[400px] overflow-y-scroll whitespace-nowrap scrollbar-hide scroll-smooth">
              <table class="table-fixed border w-full">
                <thead className=" bg-[#E0D5D5]">
                  <tr>
                    <th className=" w-[20%] text-[#F20000]">Image</th>
                    <th className="text-[#F20000]">Name</th>
                    <th className="text-[#F20000]">Category</th>
                    <th className="text-[#F20000]">Year</th>
                    <th className="text-[#F20000]">Acion</th>
                  </tr>
                </thead>
                {movie?.map((item) => (
                  <tbody key={item.id}>
                    <tr className="h-[100px] border">
                      <td className=" h-[100px] text-center flex items-center justify-center ">
                        <img
                          src={item?.poster_path}
                          width="60px"
                          className="border-2"
                        />
                      </td>
                      <td className=" text-center">{item?.title}</td>
                      <td className=" text-center">{item?.genre}</td>
                      <td className=" text-center">{item?.release_date}</td>
                      <td className=" text-center space-x-3">
                        <Link to={`/detail/${item.id}`} state={{ from: item }}>
                          <button className="text-2xl">
                            <FaEye />
                          </button>
                        </Link>
                        
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
