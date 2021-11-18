import React from "react";
import Lottie from "react-lottie";

import "./LoadingCard.css";
import animationData from "../../Assets/json/78259-loading.json";
const LoadingCard = () => {
  const defaultOptions = {
    animationData: animationData,
    loop: true,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="loadingPage">
      <Lottie options={defaultOptions} height={500} width={500} />
    </div>
  );
};
export default LoadingCard;
