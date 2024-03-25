import React, { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../services/authService";
import { message } from "antd";
import tokenMethod from "../utils/token";
import { orderService } from "../services/orderService";
import { useNavigate } from "react-router-dom";
import PATHS from "../constants/paths";

const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
  const [showedModal, setShowedModal] = useState("");
  const [profile, setProfile] = useState();
  const [courseInfo, setCourseInfo] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState([]);

  const navigate = useNavigate();
  // SHOW MODAL
  const handleShowModal = (modalType) => {
    if (!!!tokenMethod.get()) {
      setShowedModal(modalType || "");
    }
  };
  // CLOSE MODAL
  const handleCloseModal = (e) => {
    e?.stopPropagation();
    setShowedModal("");
  };

  // LOGIN
  const handleLogin = async (loginData, callback) => {
    const payload = { ...loginData };
    try {
      const res = await authService.login(payload);
      const { token: accessToken, refreshToken } = res?.data?.data || {};

      // console.log("🚀res---->", res);

      // Lưu token
      tokenMethod.set({
        accessToken,
        refreshToken,
      });

      if (!!tokenMethod.get()) {
        // Lấy thông tin profile
        handleGetProfile();
        message.success("Đăng nhập thành công");
        handleGetProfileCourse();
        handleGetProfilePayment();
        handleCloseModal();
      }
      /*      if (res?.data?.data) {
        const { token: accessToken, refreshToken } = res.data.data || {};
        console.log("accessToken", accessToken);
        console.log("refreshToken", refreshToken);
      } */
    } catch (error) {
      console.log("🚀error---->", error);
      message.error("Đăng nhập thất bại");
    } finally {
      callback?.();
    }
  };

  // REGISTER
  const handleRegister = async (registerData, callback) => {
    // payload
    try {
      const { name, email, password } = registerData || {};
      const payload = {
        firstName: name,
        lastName: "",
        email,
        password,
      };
      const res = await authService.register(payload);
      //  check data case {""}
      if (res?.data?.data?.id) {
        message.success("Đăng ký thành công");
        handleLogin({
          email,
          password,
        });
      }
    } catch (error) {
      console.log("error", error);
      if (error?.response?.status === 403) {
        message.error("Email đăng ký đã tồn tại");
      } else {
        message.error("Đăng ký thất bại");
      }
    } finally {
      callback?.();
    }
  };

  // LOGOUT
  const handleLogout = () => {
    tokenMethod.remove();
    navigate(PATHS.HOME);
    setProfile(undefined);
  };

  // GET INFO PROFILE
  const handleGetProfile = async () => {
    try {
      const profileRes = await authService.getProfile();
      if (profileRes?.data?.data) {
        setProfile(profileRes.data.data);
      }
    } catch (error) {
      console.log("error", error);
      handleLogout();
    }
  };

  // GET INFO COURSE
  const handleGetProfileCourse = async () => {
    try {
      const res = await orderService.getCourseHistories();
      const orderedCourses = res?.data?.data?.orders || [];
      setCourseInfo(orderedCourses);
    } catch (error) {
      console.log("getCourseHistories error", error);
    }
  };

  // GET INFO PAYMENT
  const handleGetProfilePayment = async () => {
    try {
      const res = await orderService.getPaymentHistories();
      const payments = res?.data?.data?.orders || [];
      setPaymentInfo(payments);
    } catch (error) {
      console.log("getPaymentHistories error", error);
    }
  };

  // UPDATE PROFILE
  const handleUpdateProfile = async (formData) => {
    try {
      const { firstName, lastName, facebookURL, website, phone, introduce } =
        formData;
      const payload = {
        firstName: firstName,
        lastName: "",
        facebookURL,
        website,
        phone,
        introduce,
      };
      console.log("🚀payload---->", payload);
      const res = await authService.updateProfile(payload);
      if (res?.data?.data?.id) {
        message.success("Cập nhật thông tin thành công!!!");
        handleGetProfile();
      }
    } catch (error) {
      console.log("UpdateProfile error", error);
    }
  };

  useEffect(() => {
    if (tokenMethod.get()) {
      handleGetProfile();
      handleGetProfileCourse();
      handleGetProfilePayment();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        showedModal,
        handleShowModal,
        handleCloseModal,
        handleLogin,
        handleRegister,
        handleLogout,
        handleGetProfile,
        handleGetProfileCourse,
        handleGetProfilePayment,
        handleUpdateProfile,
        profile,
        courseInfo,
        paymentInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
