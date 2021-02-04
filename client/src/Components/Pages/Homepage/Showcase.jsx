import React from "react";

const Showcase = () => {
  return (
    <div className="item-display">
      <div className="container">
        <h2 className="heading-primary">
          <span>SHOWCASE</span>
        </h2>
      </div>

      <div className="container-big">
        <div>
          <img src="./assets/img/lehenga1.jpg" alt="" className="img-fluid" />
        </div>
        <div className="row item-display__row">
          <div className="col-12 col-sm-6">
            <img src="./assets/img/flmnm.jpg" alt="" className="img-fluid" />
          </div>
          <div className="col-12 col-sm-6">
            <img src="./assets/img/flmnm.jpg" alt="" className="img-fluid" />
          </div>
          <div className="col-12 col-sm-6">
            <img src="./assets/img/flmnm.jpg" alt="" className="img-fluid" />
          </div>
          <div className="col-12 col-sm-6">
            <img src="./assets/img/flmnm.jpg" alt="" className="img-fluid" />
          </div>
        </div>
        <div>
          <img src="./assets/img/lehenga.jpg" alt="" className="img-fluid" />
        </div>
      </div>
    </div>
  );
};

export default Showcase;
