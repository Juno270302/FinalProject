import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Role } from "../components/Role";
import AdminPage from "./Admin/Product/AdminPage";
import UsersPage from "./UsersPage";

const Home = () => {
  const userInfo = Role();
  const [users, setUsers] = useState({});
  useEffect(() => {
    setUsers(userInfo);
  }, [userInfo?.role]);
  return <>{users?.role === "admin" ? <AdminPage /> : <UsersPage />}</>;
};

export default Home;
