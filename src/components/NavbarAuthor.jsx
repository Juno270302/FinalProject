import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { MdDeleteForever } from "react-icons/md";
import NavbarAuthorDetail from "./NavbarAuthorDetail";

const NavbarAuthor = ({ movie, data, role }) => {
  

  let a;
  if (role === "Cast") {
    return (a = <NavbarAuthorDetail movie={movie} data={data} role={role}/>);
  }
  if (role === "Production") {
    return (a = <NavbarAuthorDetail movie={movie} data={data} role={role}/>);
  }

  if (role === "Directing") {
    return (a = <NavbarAuthorDetail movie={movie} data={data} role={role}/>);
  }

  return <div>{a}</div>;
};

export default NavbarAuthor;
