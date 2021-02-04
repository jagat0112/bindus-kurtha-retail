// import React, { useState } from "react";
// import "./slider.css";
// import S1 from "./Homepage/Assets/slick/slick-01.jpg";
// import S2 from "./Homepage/Assets/slick/slick-02.jpg";
// import S3 from "./Homepage/Assets/slick/slick-03.jpg";
// import S4 from "./Homepage/Assets/slick/slick-04.jpg";
// import S5 from "./Homepage/Assets/slick/slick-05.jpg";

// const ImageComponent = ({ src }) => {
//   return (
//     <div>
//       <img src={src} className="slider-img" alt=""></img>
//     </div>
//   );
// };

// const Slider = () => {
//   let SliderArr = [
//     <ImageComponent src={S1} />,
//     <ImageComponent src={S2} />,
//     <ImageComponent src={S3} />,
//     <ImageComponent src={S4} />,
//     <ImageComponent src={S5} />,
//   ];
//   const [x, setX] = useState(0);
//   const goLeft = () => {
//     x === 0 ? setX(-100 * (SliderArr.length - 1)) : setX(x + 100);
//   };
//   const goRight = () => {
//     x === -100 * (SliderArr.length - 1) ? setX(0) : setX(x - 100);
//   };

//   return (
//     <div className="slider">
//       {SliderArr.map((item) => {
//         return (
//           <div className="slide" style={{ transform: `translate(${x}%)` }}>
//             {item}
//           </div>
//         );
//       })}
//       <button id="goLeft" onClick={goLeft}>
//         <i class="fas fa-chevron-left"></i>
//       </button>
//       <button id="goRight" onClick={goRight}>
//         <i class="fas fa-chevron-right"></i>
//       </button>
//       <div data-slick='{"slidesToShow": 4, "slidesToScroll": 4}'>
//         <div>
//           <h3>1</h3>
//         </div>
//         <div>
//           <h3>2</h3>
//         </div>
//         <div>
//           <h3>3</h3>
//         </div>
//         <div>
//           <h3>4</h3>
//         </div>
//         <div>
//           <h3>5</h3>
//         </div>
//         <div>
//           <h3>6</h3>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Slider;
