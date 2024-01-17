import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoTime } from "react-icons/io5";
import { MdDateRange } from "react-icons/md";
import { CiPlay1 } from "react-icons/ci";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";


import { MdChevronLeft, MdChevronRight } from "react-icons/md";

import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import ShowCast from "../components/ShowCast";

const Detail = () => {
  const use = useLocation();
  const movie = use.state.from;
  const [like, setLike] = useState(false);
  const [users, setUsers] = useState([]);
  const [save, setSave] = useState();
  console.log(save);
  const [saveHistory, setSaveHistory] = useState();

  const { user } = UserAuth();

  const movieID = doc(db, "users", `${user?.uid}`);

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user.uid}`), (doc) => {
      setSave(doc.data()?.savedShows);
    });
  }, [user?.uid]);

  useEffect(() => {
    const a = users?.filter((e) => e.id === movie.id);
    setLike(a[0]?.like);
  }, [users]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieID = doc(db, "users", `${user?.uid}`);
        const docSnap = await getDoc(movieID);
        setUsers(docSnap.data()?.savedShows);
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [users?.id]);

  const saveShow = async () => {
    if (user?.uid) {
      if (like === undefined || like === false) {
        setLike(true);
        await updateDoc(movieID, {
          savedShows: arrayUnion({
            id: movie?.id,
            title: movie?.title,
            backdrop_path: movie?.backdrop_path,
            language: movie?.language,
            hours: movie?.hours,
            overview: movie?.overview,
            poster_path: movie?.poster_path,
            genre: movie?.genre,
            release_date: movie?.release_date,
            like: true,
          }),
        });
      } else {
        try {
          setLike(false);
          const result = save.filter((item) => item.id !== movie.id);
          
          await updateDoc(movieID, {
            savedShows: result,
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  const historyShow = async () => {
    if (user?.uid) {
      await updateDoc(movieID, {
        historyShow: arrayUnion({
          id: movie?.id,
          title: movie?.title,
          backdrop_path: movie?.backdrop_path,
          language: movie?.language,
          hours: movie?.hours,
          overview: movie?.overview,
          poster_path: movie?.poster_path,
          genre: movie?.genre,
          release_date: movie?.release_date,
          history: true,
        }),
      });
    }
  };

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <div className="w-full h-full text-white  ">
      <div className="w-full h-full">
        <div className="bg-[#212140]">
          <img
            className="w-full h-full object-cover opacity-10 "
            src={movie?.backdrop_path}
            alt={movie?.title}
          />
        </div>
        <div className="absolute top-[30%] w-full h-[560px] px-52 ">
          <div className="flex space-x-14 h-full ">
            <div className=" w-[40%] rounded-xl flex justify-end">
              <img
                src={movie?.poster_path}
                className="rounded-xl w-[400px] h-[100%]"
              />
            </div>
            <div className="flex flex-col justify-center space-y-11 mb-32  h-full w-[65%] ">
              <div className="font-bold text-4xl">{movie.title}</div>
              <div className="flex space-x-9">
                <p className="bg-[#fb9bbc] px-2">HD 4K</p>
                <p>{movie?.genre}</p>
                <div className="flex space-x-2">
                  <MdDateRange className="mt-0.5 text-[#fb9bbc]" />
                  <p>{movie?.release_date}</p>
                </div>
                <div className="flex space-x-2">
                  <IoTime className="mt-0.5 text-[#fb9bbc]" />
                  <p>{movie?.hours}</p>
                </div>
              </div>
              <div className="w-[50%]">
                {truncateString(movie?.overview, 150)}
              </div>
              <div className="flex  space-x-14 items-center">
                <div>Language : {movie?.language}</div>
                <Link to={`/video/${movie.id}`} state={movie}>
                  <button
                    onClick={() => historyShow(movie.id)}
                    className="rounded-full bg-[#fb9bbc] py-2 px-12 flex space-x-2"
                  >
                    <CiPlay1 className="text-2xl" />
                    <p>Watch</p>
                  </button>
                </Link>
                <button onClick={() => saveShow()}>
                  {like ? (
                    <FaHeart className="text-3xl text-gray-300" />
                  ) : (
                    <FaRegHeart className="text-3xl text-gray-300" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#080A1A] h-[500px] w-full px-28 ">
          <div className="  p-30">
            <div className="flex flex-row space-x-3 py-14 text-2xl ">
              <p className="text-red-600 mt-1">
                <IoPeople />{" "}
              </p>
              <h1 className="font-body ">Casts</h1>
            </div>

            <div className="text-black">
              <div className="relative flex items-center group">
                <MdChevronLeft
                  onClick={slideLeft}
                  className="bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
                  size={40}
                />

                <div
                  id={"slider"}
                  className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative space-x-10"
                >
                  {movie.cast?.map((item) => (
                    <ShowCast item={item} key={item.id} />
                  ))}
                </div>

                <MdChevronRight
                  onClick={slideRight}
                  className="bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
                  size={40}
                />
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
