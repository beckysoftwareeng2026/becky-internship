import React, { useEffect } from "react";
import HeaderExplore from "../components/explore/HeaderExplore";
import ExploreItems from "../components/explore/ExploreItems";

const Explore = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        {/* Hero Banner */}
        <section
          id="subheader"
          className="text-light"
          style={{
            background: "url('/img/background/subheader.jpg') center center",
            backgroundSize: "cover",
            padding: "120px 0",
          }}
        >
          <div className="center-y text-center">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <h1>Explore</h1>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <HeaderExplore />
              </div>
            </div>
          </div>
        </section>

        {/* NFT Grid */}
        <section aria-label="section">
          <div className="container">
            <div className="row">
              <ExploreItems />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Explore;
