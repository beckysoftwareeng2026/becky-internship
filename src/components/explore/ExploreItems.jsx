import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=likes_high_to_low",
    )
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5">
        <h4>Loading Explore Items...</h4>
      </div>
    );
  }

  return (
    <>
      {/* Sort Dropdown */}
      <div className="col-md-12">
        <div className="items_filter mb30">
          <form className="row">
            <div className="col-md-3">
              <select className="form-control">
                <option>Default</option>
                <option>Price, Low to High</option>
                <option>Price, High to Low</option>
                <option>Most Liked</option>
              </select>
            </div>
          </form>
        </div>
      </div>

      {/* NFT Cards */}
      {items.map((item) => (
        <div
          key={item.nftId}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb30"
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link to="/author">
                <img src={item.authorImage} alt="author" className="lazy" />
                <i className="fa fa-check"></i>
              </Link>
            </div>

            <div className="de_countdown">{item.expiry || "5h 30m 32s"}</div>

            <div className="nft__item_wrap">
              <div className="nft__item_extra">
                <div className="nft__item_buttons">
                  <button>Buy Now</button>
                </div>
              </div>

              <Link to={`/item-details/${item.nftId}`}>
                <img
                  src={item.nftImage}
                  className="lazy nft__item_preview"
                  alt={item.title}
                />
              </Link>
            </div>

            <div className="nft__item_info">
              <Link to={`/item-details/${item.nftId}`}>
                <h4>{item.title}</h4>
              </Link>

              <div className="nft__item_price">{item.price || "3.08 ETH"}</div>

              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{item.likes || 69}</span>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="col-md-12 text-center mt-4">
        <button className="btn-main lead">Load More</button>
      </div>
    </>
  );
};

export default ExploreItems;
