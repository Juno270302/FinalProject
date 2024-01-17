import { collection, onSnapshot } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { db } from "../firebase";
import { useEffect } from "react";
import ShowMovie from "../components/ShowMovie";
import { GrPowerReset } from "react-icons/gr";

const MoviesSeries = () => {
  const [movies, setMovies] = useState([]);
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [genre, setGenre] = useState([]);
  const [value, setValue] = useState("");
  const [test, setTest] = useState(false);
  console.log(movies)

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "movies"), (snapShot) => {
      let list = [];
      snapShot.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setMovies(list);
      setRefresh(false);
    });

    return () => {
      unsub();
    };
  }, [refresh === true]);

  useEffect(() => {
    setCount(movies.length);
  }, [movies]);

  useEffect(() => {
    onSnapshot(collection(db, "genres"), (snapShot) => {
      let list = [];
      snapShot.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setGenre(list);
    });
  }, [movies?.id]);

  const SearchBlog = (e) => {
    e.preventDefault();

    setMovies(
      movies.filter((e) =>
        e?.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  const handleSelect1 = (e) => {
    e.preventDefault();
    setValue(e.target.value);
    setTest(true);
  };

  useEffect(() => {
    if (test) {
      setMovies(movies.filter((e) => e.genre === value));
    }
    setTest(false);
  }, [test === true]);

  return (
    <div className="bg-[#212140] h-screen w-full ">
      <div className="absolute w-[90%] top-36 px-40 mx-16 ">
        <div className="flex justify-between  ">
          <div className="text-white font-bold text-xl my-5 flex space-x-2 ml-20 ">
            <span>Total</span>
            <span className="text-red-600"> {count} </span>
            <span>items Found</span>
          </div>
          <div className="w-[30%] flex p-5 mx-5 ">
            <select
              onChange={(e) => handleSelect1(e)}
              id="Category"
              class=" mx-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {genre.map((option) => (
                <option value={option.key}>{option.key}</option>
              ))}
            </select>
          </div>

          <div className="flex justify-center space-x-5 ">
            <form
              onSubmit={SearchBlog}
              className="py-5 space-x-5 w-full text-right"
            >
              <input
                className="py-2 px-5 rounded-xl w-[5  0%] "
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>
            <button onClick={(e) => setRefresh(true)}>
              <GrPowerReset className="text-3xl text-[#ff99be]" />
            </button>
          </div>
        </div>

        <div className="ml-20 w-full">
          {movies.map((item) => (
            <ShowMovie item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoviesSeries;
