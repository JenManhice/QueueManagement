import React from "react";
import vmLogo from "../../Assets/vodacom-logo.png";
import { useForm } from "react-hook-form";
import "./ForgotPass.css";
import { useNavigate } from "react-router-dom";
import AuthService from "../../../services/API";
import { useDispatch } from "react-redux";
import { setLoader, UnsetLoader } from "../../../redux/actions/LoaderActions";
import { useTranslation } from "react-i18next";
import Navbar from "../../Layout/Navbar/Navbar";

const Forgot = () => {
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
    e.preventDefault();

    dispatch(setLoader());

    localStorage.setItem("forgot", 1);

    let obj = {
      username: data.email,
    };

    localStorage.setItem("emailj", data.email);

    AuthService.forgot(obj)
      .then((res) => {
        dispatch(UnsetLoader());
        console.log(res);
        navigate("/otp");
      })
      .catch((e) => {
        dispatch(UnsetLoader());
        console.log(e);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="login-container">
      
      <div className="login-form">
        <div className="logo-container">
          <img className="login-logo" src={vmLogo} alt="logo" />
        </div>

        <div className="text">
          <h2>{t("forgot.title")}</h2>
          <p>{t("forgot.instruction")}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-container">
            <div className="">
              <input
                className="input-field"
                type="email"
                placeholder={t("forgot.email_placeholder")}
                name="email"
                {...register("email", {
                  required: t("forgot.alert_email_required"),
                  pattern: {
                    value:
                      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                    message: t("forgot.alert_email_invalid"),
                  },
                })}
              ></input>
              <p className="alert-message">{errors.email?.message}</p>
            </div>
          </div>

          <div style={{ marginTop: 16 }}>
            <button className="submit" type="submit">
              {t("forgot.send_otp")}
            </button>
          </div>
        </form>
      </div>

      <div className="image"></div>
    </div>
        </div>

  );
};

export default Forgot;
