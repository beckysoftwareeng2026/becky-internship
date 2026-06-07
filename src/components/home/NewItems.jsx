import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider({
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
    fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);

        setTimeout(() => setLoaded(true), 50);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="text-center">
          <h2>New Items</h2>
          <div className="small-border bg-color-2"></div>
        </div>

        {loaded && (
          <div ref={sliderRef} className="keen-slider">
            {items.map((item, index) => (
              <div className="keen-slider__slide" key={item.nftId || index}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link to="/author">
                      <img src={item.authorImage} alt="" />
                    </Link>
                  </div>

                  <div className="nft__item_wrap">
                    <Link to={`/item-details/${item.nftId}`}>
                      <img src={item.nftImage} alt={item.title} />
                    </Link>
                  </div>

                  <div className="nft__item_info">
                    <h4>{item.title}</h4>
                    <div>{item.price || "3.08 ETH"}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default NewItems;
