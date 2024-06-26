import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import styles from "./create.module.css";
import StoreMallDirectoryIcon from "@mui/icons-material/StoreMallDirectory";
import img1 from "../../Assets/img1.png";
import img2 from "../../Assets/img2.png";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InfoIcon from "@mui/icons-material/Info";
import homeStyles from "../Homepage/Homepage.module.css";
import img3 from "../../Assets/img3.png";
import TimerIcon from "@mui/icons-material/Timer";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  addStoreDetails,
  checkStore,
} from "../../../redux/actions/LayoutAction";
import { setLoader, UnsetLoader } from "../../../redux/actions/LoaderActions";
import { message } from "antd";
import { useTranslation } from "react-i18next"; // Import useTranslation hook
import en from "../../../locale/en.json"; // Import your language JSON files
import pt from "../../../locale/pt.json";

const CreateStore = () => {
  const { t } = useTranslation(); // Initialize useTranslation hook
  const navigate = useNavigate();
  const [strName, setStrName] = useState("");
  const [ctr, setCtr] = useState(0);
  const [billTime, setBillTime] = useState(0);
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);
  const [ShopCounter, setShopCounter] = useState([]);
  const [countertime, setCountertime] = useState([]);
  const [avgtime, setAvgtime] = useState([]);
  const [about, setAbout] = useState("");
  const [loc, setLoc] = useState({
    lat: 0,
    long: 0,
  });
  const [storeDetails, setStoreDetails] = useState({});

  const dispatch = useDispatch();

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  function showPosition(position) {
    setLoc({ lat: position.coords.latitude, long: position.coords.longitude });
  }

  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.log("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        console.log("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        console.log("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        console.log("An unknown error occurred.");
        break;
      default:
        console.log("An unknown error occurred.");
    }
  }

  const funSub = () => {
    let counters = new Array(ctr).fill(0);

    dispatch(setLoader());
    dispatch(
      addStoreDetails(
        strName,
        parseInt(ctr),
        about,
        counters,
        counters,
        counters,
        parseFloat(loc.lat),
        parseFloat(loc.long)
      )
    )
      .then(() => {
        dispatch(UnsetLoader());
        message.success(t("createstore.storeDetailsUpdated"));
      })
      .catch((error) => {
        dispatch(UnsetLoader());
        message.error(t("createstore.storeDetailsFailed"));
        console.error(error);
      });
  };

  useEffect(() => {
    let user = localStorage.getItem("userid");
    if (user === null) {
      navigate("/");
    }
    dispatch(setLoader());
    dispatch(checkStore())
      .then((res) => {
        dispatch(UnsetLoader());
        setStoreDetails(res.data);
        setStrName(res.data.name);
        setAbout(res.data.Address);
        setCtr(res.data.counter);
        setLoc({
          lat: res.data.latti,
          long: res.data.longi,
        });
        setShopCounter(new Array(res.data.counter).fill(0));
        setCountertime(new Array(res.data.counter).fill(0));
        setAvgtime(new Array(res.data.counter).fill(0));
      })
      .catch((err) => {
        console.log(err.status);
        dispatch(UnsetLoader());
        setStoreDetails({});
      });
  }, [dispatch, navigate]);

  return (
    <>
      <Navbar />
      <div
        className="main"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <div className={styles.box}>
          <h1>{storeDetails.name ? t("createstore.editStoreDetails") : t("createstore.createStore")}</h1>
          <br />
          <StoreMallDirectoryIcon
            style={{ position: "relative", top: "10px" }}
            fontSize="large"
          />
          <input
            placeholder={t("createstore.storeNamePlaceholder")}
            value={strName}
            onChange={(e) => {
              setStrName(e.target.value);
            }}
          />
          <br />
          <select
            className="form-select"
            aria-label="Default select example"
            style={{
              width: "80%",
              marginLeft: "8%",
              borderColor: "#192839",
              borderWidth: "2px",
              padding: "6px 10px",
              borderRadius: "10px",
              fontSize: "16px",
            }}
          >
            <option selected>{t("createstore.storeType")}</option>
            <option value="1">{t("createstore.generalStore")}</option>
          </select>
          <br />
          <img
            src={img1}
            alt="counters"
            style={{ width: "7%", position: "relative", top: "10px" }}
          />
          <input
            placeholder={t("createstore.counters")}
            value={ctr}
            onChange={(e) => {
              setCtr(e.target.value);
            }}
          />
          <br />
          <LocationOnIcon
            style={{ position: "relative", top: "10px" }}
            fontSize="large"
          />
          <button className={styles.coord} onClick={getLocation}>
            {t("createstore.getCoordinates")}
          </button>
          <p>
            {loc.lat},{loc.long}
          </p>
          <br />
          <img
            src={img2}
            alt="counters"
            style={{ width: "7%", position: "relative", top: "10px" }}
          />
          <input
            placeholder={t("createstore.billingTimePlaceholder")}
            value={billTime}
            onChange={(e) => {
              setBillTime(e.target.value);
            }}
          />
          <p
            style={{
              fontSize: "14px",
              marginLeft: "10px",
              position: "relative",
              top: "-15px",
              color: "gray",
            }}
          >
            {t("createstore.waitingTimeNote")}
          </p>
          <AccessTimeIcon
            style={{ position: "relative", top: "10px" }}
            fontSize="large"
          />
          <input
            placeholder={t("createstore.from")}
            style={{ width: "39%" }}
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
          <input
            placeholder={t("createstore.to")}
            style={{ width: "39%" }}
            value={to}
            onChange={(e) => {
              setTo(e.target.value);
            }}
          />
          <br />
          <InfoIcon
            style={{ position: "relative", top: "-30px" }}
            fontSize="large"
          />
          <textarea
            placeholder={t("createstore.aboutPlaceholder")}
            value={about}
            onChange={(e) => {
              setAbout(e.target.value);
            }}
          />
          <button
            className={homeStyles.enterButton}
            style={{ width: "50%", marginLeft: "15%", marginTop: "10px" }}
            onClick={() => funSub()}
          >
            {storeDetails.name ? t("createstore.update") : t("createstore.create")}
          </button>
          <button
            className={homeStyles.enterButton}
            style={{ width: "50%", marginLeft: "15%", marginTop: "10px" }}
            onClick={() => navigate("/view-queue/id")}
          >
            {t("createstore.viewQueue")}
          </button>
          <button
            className={homeStyles.enterButton}
            style={{ width: "50%", marginLeft: "15%", marginTop: "10px" }}
            onClick={() => navigate("/chart")}
          >
            {t("createstore.viewStoreAnalytics")}
          </button>
        </div>
        <div className={styles.box}>
          <h1>{t("createstore.storePreview")}</h1>
          <div className={styles.mobile}>
            <table className={styles.table}>
              <tbody>
                <tr>
                  <td className={styles.left}>
                    <h1 className={homeStyles.mainHead} style={{ margin: "0" }}>
                      {strName !== "" ? strName : t("createstore.defaultStoreName")}
                    </h1>
                    <table>
                      <tbody>
                        <tr>
                          <td style={{ padding: "10px" }}>
                            <div>
                              <img
                                src={img1}
                                alt="counters"
                                className={homeStyles.icons}
                              />
                              <div className={homeStyles.roundNo}>
                                {ctr ? ctr : "0"}
                              </div>
                              <div
                                style={{ textAlign: "center", width: "100%" }}
                              >
                                {t("createstore.counters")}
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: "10px" }}>
                            <div>
                              <TimerIcon
                                style={{
                                  position: "relative",
                                  color: "#192839",
                                  fontSize: "38px",
                                  display: "inline-block",
                                  top: "6px",
                                }}
                              />
                              <span
                                className={homeStyles.yellowCapsule}
                                style={{
                                  margin: "0",
                                  position: "relative",
                                  bottom: "6px",
                                  padding: "2px 5px",
                                }}
                              >
                                Xhr XXmin XXXsec
                              </span>
                              <div
                                style={{ textAlign: "center", width: "100%" }}
                              >
                                {t("createstore.billingTimePlaceholder")}
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: "10px" }}>
                            <div>
                              <img
                                src={img2}
                                alt="counters"
                                className={homeStyles.icons}
                              />
                              <div className={homeStyles.roundNo}>X</div>
                              <div
                                style={{ textAlign: "center", width: "100%" }}
                              >
                                {t("createstore.customers")}
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: "10px" }}>
                            <div>
                              <img
                                src={img3}
                                alt="counters"
                                className={homeStyles.icons}
                              />
                              <span
                                className={homeStyles.yellowCapsule}
                                style={{
                                  margin: "0",
                                  position: "relative",
                                  bottom: "10px",
                                  padding: "2px 5px",
                                }}
                              >
                                {billTime ? billTime : "0"} min
                              </span>
                              <div
                                style={{ textAlign: "center", width: "100%" }}
                              >
                                {t("createstore.billingTimePlaceholder")}
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <AccessTimeIcon
                      fontSize="large"
                      style={{ position: "relative", top: "10px" }}
                    />{" "}
                    {t("createstore.open")} {from ? from : "9"}.00AM-{to ? to : "6"}.00PM
                    <div>
                      <h1>{t("createstore.address")}</h1>
                      <p style={{ width: "90%" }}>
                        {about ? about : t("createstore.defaultAboutText")}
                      </p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <button
            className={homeStyles.enterButton}
            style={{ width: "40%", marginLeft: "20%", marginTop: "10px" }}
            onClick={() => navigate("/")}
          >
            {t("createstore.otherStores")}
          </button>
          <p style={{ textAlign: "center", fontSize: "14px" }}>
            {t("createstore.joinQueue")}
          </p>
          <button
            className={homeStyles.enterButton}
            style={{
              width: "50%",
              marginLeft: "15%",
              marginTop: "20px",
              backgroundColor: "#FF8898",
              // borderColor: "#FF8898",
            }}
          >
            {t("createstore.closeStore")}
          </button>
          <p style={{ textAlign: "center", fontSize: "14px" }}>
            {t("createstore.deleteStore")}
          </p>
          <br />
          <br />
        </div>
      </div>
    </>
  );
};

export default CreateStore;
