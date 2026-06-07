import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 4,
      spacing: 20,
    },
    breakpoints: {
      "(max-width: 1200px)": {
        slides: { perView: 3, spacing: 15 },
      },
      "(max-width: 768px)": {
        slides: { perView: 2, spacing: 15 },
      },
      "(max-width: 576px)": {
        slides: { perView: 1, spacing: 10 },
      },
    },
  });

  useEffect(() => {
    fetch(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections",
    )
      .then((res) => res.json())
      .then((data) => {
        setCollections(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching collections:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading collections...</div>;
  }

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        {/* Title */}
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2>Hot Collections</h2>
            <div className="small-border bg-color-2"></div>
          </div>
        </div>

        {/* Slider */}
        <div ref={sliderRef} className="keen-slider">
          {collections.map((item, index) => (
            <div className="keen-slider__slide" key={item.nftId || index}>
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to={`/item-details/${item.nftId}`}>
                    <img
                      src={item.nftImage}
                      className="img-fluid"
                      alt={item.title}
                    />
                  </Link>
                </div>

                <div className="nft_coll_pp">
                  <Link to="/author">
                    <img
                      className="pp-coll"
                      src={item.authorImage}
                      alt={item.title}
                    />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>

                <div className="nft_coll_info">
                  <Link to="/explore">
                    <h4>{item.title}</h4>
                  </Link>
                  <span>{item.nftId}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
