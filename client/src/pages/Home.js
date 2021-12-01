import React from "react";
import DonutList from "../components/DonutList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";

const Home = () => {
  return (
    <div className="container">
      <CategoryMenu />
      <DonutList />
      <Cart />
    </div>
  );
};

export default Home;
