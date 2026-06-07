import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
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
    fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/explore")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading explore items:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading explore items...</div>;

  return (
    <div ref={sliderRef} className="keen-slider">
      {items.map((item, index) => (
        <div className="keen-slider__slide" key={item.nftId || index}>
          <div className="nft__item">
            {/* Author */}
            <div className="author_list_pp">
              <Link to="/author">
                <img src={item.authorImage} alt={item.title} />
                <i className="fa fa-check"></i>
              </Link>
            </div>

            {/* Image */}
            <div className="nft__item_wrap">
              <Link to={`/item-details/${item.nftId}`}>
                <img
                  src={item.nftImage}
                  className="nft__item_preview"
                  alt={item.title}
                />
              </Link>
            </div>

            {/* Info */}
            <div className="nft__item_info">
              <Link to={`/item-details/${item.nftId}`}>
                <h4>{item.title}</h4>
              </Link>

              <div className="nft__item_price">{item.price || "3.08 ETH"}</div>

              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{item.likes || 0}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExploreItems;
