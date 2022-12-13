import "./wisata.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";

const Wisata = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { data, loading, error } = useFetch(`/wisata/find/${id}`);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { dates, options } = useContext(SearchContext);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }
  const [jumlahTiket, setJumlahTiket] = useState(0);
  const handleTiketChange = (e) => {
    setJumlahTiket(e.target.value);
  };

  // const days = dayDifference(dates[0].endDate, dates[0].startDate);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };
  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        "loading"
      ) : (
        <div className="wisataContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon icon={faCircleXmark} className="close" onClick={() => setOpen(false)} />
              <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow" onClick={() => handleMove("l")} />
              <div className="sliderWrapper">
                <img src={data.photos[slideNumber]} alt="" className="sliderImg" />
              </div>
              <FontAwesomeIcon icon={faCircleArrowRight} className="arrow" onClick={() => handleMove("r")} />
            </div>
          )}
          <div className="wisataWrapper">
            <h1 className="wisataTitle">{data.name}</h1>
            <div className="wisataAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className="wisataDistance">Hanya – {data.distance}m dari pusat kota</span>
            <span className="wisataPriceHighlight">Harga tiket masuk hanya Rp{data.cheapestPrice}</span>
            <div className="wisataImages">
              {data.photos?.map((photo, i) => (
                <div className="wisataImgWrapper" key={i}>
                  <img onClick={() => handleOpen(i)} src={photo} alt="" className="wisataImg" />
                </div>
              ))}
            </div>
            <div className="wisataDetails">
              <div className="wisataDetailsTexts">
                <h1 className="wisataTitle">{data.title}</h1>
                <p className="wisataDesc">{data.desc}</p>
              </div>
              <div className="wisataDetailsPrice">
                <h1>Pesan Tiket Anda Sekarang!</h1>
                <input type="number" placeholder="total dana" value={jumlahTiket} onChange={handleTiketChange} />
                <h2>
                  <b>Rp{data.cheapestPrice * jumlahTiket}</b> ({jumlahTiket} Tiket)
                </h2>
                <button onClick={handleClick}>Pesan Tiket</button>
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
    </div>
  );
};

export default Wisata;
