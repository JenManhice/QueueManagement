import React, { useState, useRef } from "react";
import "./Detail.css";
import Navbar from "../../Layout/Navbar/Navbar";
import { useForm } from "react-hook-form";
import photo1 from "../../Assets/customer.svg";
import photo2 from "../../Assets/store.svg";
import photo3 from "../../Assets/user.svg";
import { useSelector, useDispatch } from "react-redux";
import * as actionCreators from "../../../redux/actions/AuthAction";
import { useNavigate } from "react-router-dom";
import AuthService from "../../../services/API";
import { setLoader, UnsetLoader } from "../../../redux/actions/LoaderActions";
import { useTranslation } from "react-i18next";

const Details = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onTouched",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pass } = useSelector((state) => state.AuthReducer);

  const [role, setRole] = useState("Customer");
  const [fieldValue, setFieldValue] = useState(null);
  const [preview, setPreview] = useState(photo3);
  const fileRef = useRef(null);
  const [activeRole, setActiveRole] = useState(null); // State to track active role

  const onSubmit = (data) => {
    if (role === null) {
      alert(t("details.alert_role_required"));
      return;
    }

    dispatch(setLoader());

    const obj = {
      email: localStorage.getItem("email"),
      password: pass,
      fullname: data.fullname,
      mobileno: data.mobile,
      gender: data.aopt,
      role: role === "store" ? false : true,
    };
    console.log(obj);

    dispatch(actionCreators.userName(data.fullname));
    localStorage.setItem("fullname", data.fullname);
    dispatch(actionCreators.userMobile(data.mobile));
    dispatch(actionCreators.userGender(data.aopt));
    dispatch(actionCreators.userType(role));
    localStorage.setItem("Type", role);

    AuthService.Details(obj)
      .then((res) => {
        dispatch(UnsetLoader());
        localStorage.setItem("userid", res.data._id);
        if (obj.role) {
          navigate("/create-store");
          console.log(obj);
        } else {
          navigate("/login");
          console.log(obj);
        }
      })
      .catch((e) => {
        dispatch(UnsetLoader());
        console.log(e);
      });
  };

  const imageHandler = (e) => {
    setFieldValue(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreview(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleRoleClick = (selectedRole) => {
    setActiveRole(selectedRole);
    setRole(selectedRole); // Set role state based on the clicked role
    console.log("Selected role:", selectedRole);
  };

  return (
    <div className="Signup-Page">
      <Navbar />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          paddingTop: 16,
          alignItems: "center",
        }}
      >
        <div className="first-portion">
          <div className="detail-heading">
            <p className="heading1">
              {t("details.header")} <span className="ques">!</span>
            </p>
          </div>
          <div className="role">
            <p className="heading2">{t("details.select_role")}</p>
          </div>
          <div className="images-role">
            <div className={`photo1 ${activeRole === "customer" ? "active" : ""}`}>
              <div className="photo1-img">
                <img className="pic1" src={photo1} alt="logo" />
              </div>
              <div
                className="photo1-role"
                onClick={() => handleRoleClick("customer")}
              >
                {t("details.customer_role")}
              </div>
            </div>

            <div className={`photo2 ${activeRole === "store" ? "active" : ""}`}>
              <div className="photo2-img">
                <img className="pic1" src={photo2} alt="logo" />
              </div>
              <div className="photo2-role" onClick={() => handleRoleClick("store")}>
                {t("details.store_role")}
              </div>
            </div>
          </div>
        </div>

        <form className="second-portion" onSubmit={handleSubmit(onSubmit)}>
          <div className="upload-user">
            <div className="user-img">
              <img className="pic2" src={preview} alt="logo" />
            </div>
            <div className="upload-btn">
              <input
                hidden
                ref={fileRef}
                type={"file"}
                accept="image/*"
                onChange={imageHandler}
              />
              <button
                onClick={() => {
                  fileRef.current.click();
                }}
                className="upload-img-btn"
              >
                <i id="plus" className="fa fa-plus" aria-hidden="true"></i>{" "}
                <span>{t("details.upload_profile_pic")}</span>
              </button>
            </div>
          </div>
          <div className="input-login-field">
            <div className="fullname">
              <input
                className="input-field2"
                type="text"
                placeholder={t("details.fullname_placeholder")}
                name="fullname"
                {...register("fullname", { required: t("details.alert_name_required") })}
              ></input>
              <p className="alerts">{errors.fullname?.message}</p>
            </div>
            <div className="mobile">
              <input
                className="input-field2"
                type="text"
                placeholder={t("details.mobile_placeholder")}
                name="mobile"
                {...register("mobile", {
                  required: t("details.alert_mobile_required"),
                  pattern: {
                    value: /^[8][0-9]{8}$/i,
                    message: t("details.alert_mobile_invalid"),
                  },
                })}
              ></input>
              <p className="alerts">{errors.mobile?.message}</p>
            </div>
          </div>
          <div className="radio-btns">
            <div className="male-radio">
              <label className="label-data" htmlFor="field-male">
                <input
                  {...register("aopt", { required: t("details.alert_aopt_required") })}
                  type="radio"
                  name="aopt"
                  value="male"
                  id="field-male"
                />
                {t("details.male")}
              </label>
            </div>
            <div className="female-radio">
              <label className="label-data" htmlFor="field-female">
                <input
                  {...register("aopt", { required: t("details.alert_aopt_required") })}
                  type="radio"
                  name="aopt"
                  value="female"
                  id="field-female"
                />
                {t("details.female")}
              </label>
            </div>
            <div className="other-radio">
              <label className="label-data" htmlFor="field-other">
                <input
                  {...register("aopt", { required: t("details.alert_aopt_required") })}
                  type="radio"
                  name="aopt"
                  value="other"
                  id="field-other"
                />
                {t("details.other")}
              </label>
            </div>
            <p className="alerts">{errors.aopt?.message}</p>
          </div>
          <button className="submit-btn" type="submit">
            {t("details.submit")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Details;
