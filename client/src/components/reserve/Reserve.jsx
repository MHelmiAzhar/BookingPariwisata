import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import "./reserve.css";
import { useNavigate } from "react-router-dom";

const Reserve = ({ setOpen }) => {
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={() => setOpen(false)} />
        <span>
          <center>Tiket Anda Berhasil Dipesan</center>
        </span>
        <span></span>

        <button onClick={navigateToHome} className="rButton">
          Beli Tiket lagi
        </button>
      </div>
    </div>
  );
};

export default Reserve;
