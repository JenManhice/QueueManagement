import React, { useState } from "react";
import "./SignUp.css";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import AuthService from "../../../services/API";
import { setLoader, UnsetLoader } from "../../../redux/actions/LoaderActions";
import { userEmail, userPass } from "../../../redux/actions/AuthAction";
import Navbar from "../../Layout/Navbar/Navbar";
import vmLogo from '../../Assets/vodacom-logo.png';

const SignUp = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    mode: "onTouched",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [toggle, setToggle] = useState(false);
  const [toggle1, setToggle1] = useState(false);

  const handleTogglePassword = () => {
    setToggle(!toggle);
  };

  const handleToggleConfirmPassword = () => {
    setToggle1(!toggle1);
  };

  const onSubmit = (data, e) => {
    dispatch(setLoader());
    e.preventDefault();

    // Check if passwords match
    if (data.password !== data.cpassword) {
      setValue("cpassword", "");
      dispatch(UnsetLoader());
      alert(t('signUp.alert_password_match'));
      return;
    }

    dispatch(userEmail(data.email));
    dispatch(userPass(data.password));
    localStorage.setItem("email", data.email);

    let obj = {
      email: data.email,
      password: data.password,
    };

    AuthService.Signup(obj)
      .then((res) => {
        dispatch(UnsetLoader());
        console.log(res);
        navigate("/detail");
      })
      .catch((error) => {
        dispatch(UnsetLoader());
        console.log(error);
      });
  };

  const handleClicked = () => {
    navigate("/login");
  };

  return (
    <>
    <Navbar />
      <div className="login-container">
        <div className="login-form">
          <div className="logo-container">
            <img className="login-logo" src={vmLogo} alt="logo" />
          </div>

          <div className="text">
            <h2>{t('signUp.queue_management')}</h2>
            <p>{t('signUp.header_text')}</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-container">
              <div className="">
                <input
                  className="input-field"
                  type="email"
                  placeholder={t('signUp.email_placeholder')}
                  name="email"
                  {...register("email", {
                    required: t('signUp.alert_email_required'),
                    pattern: {
                      value:
                        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                      message: t('signUp.alert_email_invalid'),
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
                  type={toggle ? "text" : "password"}
                  placeholder={t('signUp.password_placeholder')}
                  name="password"
                  {...register("password", {
                    required: t('signUp.alert_password_required'),
                    minLength: {
                      value: 8,
                      message: t('signUp.alert_password_min_length'),
                    },
                    maxLength: {
                      value: 14,
                      message: t('signUp.alert_password_max_length'),
                    },
                  })}
                ></input>
                <p className="alert-message">{errors.password?.message}</p>
                <span className="toggle-password" onClick={handleTogglePassword}>
                  {t('signUp.password_toggle')}
                </span>
              </div>
            </div>

            <div className="form-container">
              <div className="">
                <input
                  className="input-field"
                  type={toggle1 ? "text" : "password"}
                  placeholder={t('signUp.confirm_password_placeholder')}
                  name="cpassword"
                  {...register("cpassword", {
                    required: t('signUp.alert_password_required'),
                    minLength: {
                      value: 8,
                      message: t('signUp.alert_password_min_length'),
                    },
                    maxLength: {
                      value: 14,
                      message: t('signUp.alert_password_max_length'),
                    },
                  })}
                ></input>
                <p className="alert-message">{errors.cpassword?.message}</p>
                <span className="toggle-password" onClick={handleToggleConfirmPassword}>
                  {t('signUp.password_toggle')}
                </span>
              </div>
            </div>

            <div style={{ marginTop: 16 }}>
              <p className="">
                {t('signUp.existing_users')} <span className="clickable" onClick={handleClicked}>{t('signUp.login')}</span>
              </p>

              <button className="submit" type="submit">
                {t('signUp.create_account')}
              </button>
            </div>
          </form>
        </div>

        <div className="image"></div>
      </div>
    </>
  );
};

export default SignUp;
