import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";
import { useNavigate } from "react-router-dom";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch("/wisata?featured=true&limit=4");
  const navigate = useNavigate();

  const navigateToItem = (id) => {
    navigate(`/wisata/${id}`);
  };
  return (
    <div className="fp">
      {loading ? (
        "Loading"
      ) : (
        <>
          {data.map((item) => (
            <div className="fpItem" key={item._id}>
              <img onClick={() => navigateToItem(item._id)} src={item.photos[0]} alt="" className="fpImg" />
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">Harga tiket Rp{item.cheapestPrice}</span>
              {item.rating && (
                <div className="fpRating">
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
