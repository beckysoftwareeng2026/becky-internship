import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/explore")
      .then((res) => res.json())
      .then((data) => {
        console.log("EXPLORE API DATA:", data);
        setItems(data.nfts || data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h3 className="text-center">Loading...</h3>;
  }

  return (
    <div className="row">
      {items.map((item) => (
        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={item.id}>
          <div className="nft__item">
            <div className="author_list_pp">
              <Link to="/author">
                <img className="lazy" src={item.authorImage} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>

            <div className="nft__item_wrap">
              <Link to="/item-details">
                <img
                  src={item.nftImage}
                  className="lazy nft__item_preview"
                  alt=""
                />
              </Link>
            </div>

            <div className="nft__item_info">
              <Link to="/item-details">
                <h4>{item.title}</h4>
              </Link>

              <div className="nft__item_price">{item.price} ETH</div>

              <div className="nft__item_action">
                <Link to="/item-details">Place a bid</Link>
              </div>

              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{item.likes}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExploreItems;
