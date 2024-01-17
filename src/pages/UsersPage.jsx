import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import Movie from "../components/Movie";
import Footer from "../components/Footer";
import ImageMain from "../components/ImageMain";

const UsersPage = () => {
  const [movies, setMovies] = useState([]);

  const movie = movies[Math.floor(Math.random() * movies.length)];

  //get movies -> database
  useEffect(() => {
    onSnapshot(collection(db, "movies"), (snapShot) => {
      let list = [];
      snapShot.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setMovies(list);
    });
  }, []);


  return (
    <div className="w-full h-full text-white ">
      <ImageMain movie = {movie}/>
      <Movie />
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default UsersPage;
