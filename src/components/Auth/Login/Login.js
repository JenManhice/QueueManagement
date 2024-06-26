import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "../../Layout/Navbar/Navbar"; // Update the path as needed
import vmLogo from "../../Assets/vodacom-logo.png";
import "./Login.css";
import AuthService from "../../../services/API";
import { useDispatch } from "react-redux";
import { setLoader, UnsetLoader } from "../../../redux/actions/LoaderActions";

const Login = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (data, e) => {
    dispatch(setLoader());
    // e.preventDefault();
    let obj = {
      email: data.email,
      password: data.password,
      isStore: data.aopt === "store" ? false : true,
    };
    AuthService.Login(obj)
      .then((res) => {
        dispatch(UnsetLoader());
        if (res) {
          localStorage.setItem("access", res.data.access_token);
          localStorage.setItem("refresh", res.data.refresh_token);
          localStorage.setItem("userid", res.data._id);
          localStorage.setItem("email", data.email);

          !obj.isStore ? navigate("/create-store") : navigate("/");
        }
      })
      .catch((e) => {
        dispatch(UnsetLoader());
        if (e.response.data) {
          window.alert(e.response.data.message);
        } else {
          window.alert("Something went wrong!");
        }
      });
  };

  const handleClick = () => {
    navigate("/forgot");
  };

  const handleClicked = () => {
    navigate("/signup");
  };

  return (
    <div className="login-page">
      <Navbar />
      <div className="login-container">
        <div className="login-form">
          <div className="logo-container">
            <img className="login-logo" src={vmLogo} alt="logo" />
          </div>

          <div className="text">
            <h2>{t('queue_management')}</h2>
            <p>{t('header_text')}</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="radio-button">
              <div className="customer-radio">
                <label className="label-data" htmlFor="field-customer">
                  <input
                    {...register("aopt", { required: t('alert_aopt_required') })}
                    type="radio"
                    name="aopt"
                    value="customer"
                    id="field-customer"
                  />
                  {t('customer')}
                </label>
              </div>

              <div className="store-radio">
                <label className="label-data" htmlFor="field-store">
                  <input
                    {...register("aopt", { required: t('alert_aopt_required') })}
                    type="radio"
                    name="aopt"
                    value="store"
                    id="field-store"
                  />
                  {t('store')}
                </label>
              </div>

              <p className="alert-message">{errors.aopt?.message}</p>
            </div>

            <div className="form-container">
              <div className="">
                <input
                  className="input-field"
                  type="email"
                  placeholder={t('email_placeholder')}
                  name="email"
                  {...register("email", {
                    required: t('alert_email_required'),
                    pattern: {
                      value:
                        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                      message: t('alert_email_invalid'),
                    },
                  })}
                ></input>
                <p className="alert-message">{errors.email?.message}</p>
              </div>
            </div>

            <div className="form-container">
              <div className="">
                <input
                  className="input-field"
                  type={"password"}
                  placeholder={t('password_placeholder')}
                  name="password"
                  {...register("password", {
                    required: t('alert_password_required'),
                    minLength: {
                      value: 8,
                      message: t('alert_password_min_length'),
                    },
                    maxLength: {
                      value: 14,
                      message: t('alert_password_max_length'),
                    },
                  })}
                ></input>
                <p className="alert-message">{errors.password?.message}</p>
              </div>
            </div>

            <div style={{ marginTop: 16 }}>
              <p className="">
                <span className="clickable" onClick={handleClick}>
                  {t('forgot_password')}
                </span>{" "}
                or{" "}
                <span className="clickable" onClick={handleClicked}>
                  {t('create_account')}
                </span>
              </p>

              <button className="submit" type="submit">
                {t('login')}
              </button>
            </div>
          </form>
        </div>

        <div className="image"></div>
      </div>
    </div>
  );
};

export default Login;
