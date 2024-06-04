import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import PageLoading from "../PageLoading";
import { MODAL_TYPES } from "../../constants/general";
import Input from "../Input";
import Button from "../Button";
import { message } from "antd";
import { REGEX } from "../../constants/regex";
import ComponentLoading from "../ComponentLoading";

const LoginForm = () => {
  const { handleShowModal, handleCloseModal, handleLogin } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
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

    const errorObject = {};

    if (!!!form.email) {
      errorObject.email = "Vui lòng nhập email";
    } else if (!REGEX["email"].test(form.email)) {
      errorObject.email = "Vui lòng nhập đúng định dạng email";
    }

    if (!!!form.password) {
      errorObject.password = "Vui lòng nhập mật khẩu";
    }

    setError(errorObject);

    // end validate

    if (Object.keys(errorObject)?.length > 0) {
      console.log("Submit error", errorObject);
    } else {
      setLoading(true);
      handleLogin?.({ ...form }, () => {
        setTimeout(() => {
          setLoading(false);
        }, 300);
      });
    }
  };
  return (
    <div
      className="modal__wrapper-content mdlogin active"
      style={{ position: "relative" }}
    >
      {" "}
      {loading && <ComponentLoading />}
      <div className="form__bottom">
        <p>Bạn chưa có tài khoản?</p>
        <div
          className="color--primary btnmodal"
          data-modal="mdregister"
          onClick={() => handleShowModal(MODAL_TYPES.register)}
        >
          <strong>Đăng ký</strong>
        </div>
      </div>
      <form onSubmit={_onSubmit} className="form">
        <Input
          label="Email"
          placeholder="Email"
          required
          {...register("email")}
        />
        <Input
          label="Password"
          placeholder="Password"
          required
          type="password"
          {...register("password")}
        />
        <Button className="form__btn-register" type="submit">
          Đăng nhập
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
