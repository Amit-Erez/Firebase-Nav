import React from "react";
import Logo from "../assets/Frontend-Logo.png";



const Loading = () => {
  return (
    <div>
      <nav>
        <figure className="logo__img--wrapper">
          <img src={Logo} className="logo__img"></img>
        </figure>
        <div className="nav__buttons">
          <div className="reg__btn--skeleton"></div>
          <div className="user__skeleton"></div>
        </div>
      </nav>
    </div>
  );
};

export default Loading;
