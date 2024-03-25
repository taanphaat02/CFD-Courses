import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { REGEX } from "../../constants/regex";
import { MODAL_TYPES } from "../../constants/general";
import Input from "../Input";
import { Link } from "react-router-dom";
import Button from "../Button";
import { message } from "antd";
import PATHS from "../../constants/paths";
import ComponentLoading from "../ComponentLoading";

const RegisterForm = () => {
  const { handleShowModal, handleCloseModal, handleRegister } =
    useAuthContext();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({});

  const register = (registerField) => {
    return {
      name: registerField,
      error: error[registerField],
      value: form[registerField],
      onChange: (e) => setForm({ ...form, [registerField]: e.target.value }),
    };
  };
  const _onSubmit = (e) => {
    e.preventDefault();

    // start validate
    const errorObject = {};

    if (!!!form.name) {
      errorObject.name = "Vui lòng nhập họ và tên";
    }

    if (!!!form.email) {
      errorObject.email = "Vui lòng nhập email";
    } else if (!REGEX["email"].test(form.email)) {
      errorObject.email = "Vui lòng nhập đúng định dạng email";
    }

    if (!!!form.password) {
      errorObject.password = "Vui lòng nhập mật khẩu";
    }

    if (!!!form.confirmPassword) {
      errorObject.confirmPassword = "Vui lòng xác nhận mật khẩu";
    } else if (form.password && form.confirmPassword !== form.password) {
      errorObject.confirmPassword = "Mật khẩu xác nhận không đúng";
    }

    setError(errorObject);
    // end validate

    if (Object.keys(errorObject)?.length > 0) {
      console.log("Submit error", errorObject);
    } else {
      setLoading(true);
      console.log("Submit success", form);
      handleRegister({ ...form }, () => {
        setTimeout(() => {
          setLoading(false);
        }, 300);
      });
    }
  };
  return (
    <div
      className="modal__wrapper-content mdregister active"
      style={{ position: "relative" }}
    >
      {loading && <ComponentLoading />}
      <div className="form__bottom">
        <p>Bạn đã có tài khoản?</p>
        <div
          className="color--primary btnmodal"
          data-modal="mdlogin"
          onClick={() => handleShowModal(MODAL_TYPES.login)}
        >
          <strong>Đăng nhập</strong>
        </div>
      </div>
      <form onSubmit={_onSubmit} className="form">
        <Input
          label="Họ và tên"
          placeholder="Họ và tên"
          required
          {...register("name")}
        />
        <Input
          label="Email"
          placeholder="Email"
          required
          {...register("email")}
        />
        <Input
          label="Mật khẩu"
          placeholder="Mật khẩu"
          required
          {...register("password")}
        />
        <Input
          label="Xác nhận mật khẩu"
          placeholder="Xác nhận mật khẩu"
          required
          {...register("confirmPassword")}
        />
        <p className="form__argee">
          Với việc đăng ký, bạn đã đồng ý{" "}
          <Link
            className="color--primary"
            to={PATHS.PRIVACY}
            onClick={handleCloseModal}
          >
            Chính Sách Điều Khoản
          </Link>{" "}
          của CFD
        </p>
        <Button className="form__btn-register" type="submit">
          Đăng ký tài khoản
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
