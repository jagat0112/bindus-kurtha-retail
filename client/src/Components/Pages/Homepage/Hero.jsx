import React from "react";
import Carousel from "react-bootstrap/Carousel";
import S1 from "./Assets/slider-01.jpg";
import S2 from "./Assets/slider-02.jpg";
import S3 from "./Assets/slider-03.jpg";

const Hero = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img src={S1} height="370px" alt=""></img>
      </Carousel.Item>
      <Carousel.Item>
        <img src={S2} height="370px" alt=""></img>
      </Carousel.Item>
      <Carousel.Item>
        <img src={S3} height="370px" alt=""></img>
      </Carousel.Item>
    </Carousel>
  );
};

export default Hero;
