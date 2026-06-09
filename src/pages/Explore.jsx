import React from "react";
import ExploreItems from "../components/explore/ExploreItems";

const Explore = () => {
  return (
    <>
      <section id="subheader" className="text-light">
        <div className="center-y relative text-center">
          <div className="container">
            <h1>Explore</h1>
          </div>
        </div>
      </section>

      <section aria-label="section">
        <div className="container">
          <ExploreItems />
        </div>
      </section>
    </>
  );
};

export default Explore;
