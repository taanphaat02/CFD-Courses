import { useEffect, useRef, useState } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import { REGEX } from "../../../constants/regex";
import TextArea from "../../TextArea";
import Button from "../../Button";
import Input from "../../Input";

const MyInfo = () => {
  const { profile, handleUpdateProfile } = useAuthContext();
  const [error, setError] = useState({});

  const initalForm = useRef({
    firstName: "",
    email: "",
    facebookURL: "",
    phone: "",
    website: "",
    introduce: "",
  });

  const [form, setForm] = useState(initalForm.current);

  const isChanged = JSON.stringify(initalForm.current) !== JSON.stringify(form);

  useEffect(() => {
    if (profile) {
      setForm({ ...form, ...profile });
    }
  }, [profile]);

  const _onSubmit = (e) => {
    e.preventDefault();
    if (!isChanged) return;
    // Validate OrderForm
    e.preventDefault();

    // start validate
    const errorObject = {};

    if (!!!form.firstName) {
      errorObject.firstName = "Vui lòng nhập tên";
    }

    if (!!!form.phone) {
      errorObject.phone = "Vui lòng nhập phone";
    } else if (!REGEX.phone.test(form.phone)) {
      errorObject.phone = "Vui lòng nhập đúng định dạng phone";
    }

    if (form.facebookURL && !REGEX.facebookURL.test(form.facebookURL)) {
      errorObject.facebookURL = "Vui lòng nhập đúng định dạng website";
    }

    if (form.website && !REGEX.website.test(form.website)) {
      errorObject.website = "Vui lòng nhập đúng định dạng website";
    }

    setError(errorObject);

    if (Object.keys(errorObject).length > 0) {
      console.log("UpdateProfile Error: ", errorObject);
    } else {
      handleUpdateProfile?.(form);
    }
  };

  const register = (registerField) => {
    return {
      name: registerField,
      error: error[registerField],
      value: form[registerField],
      onChange: (e) => setForm({ ...form, [registerField]: e.target.value }),
    };
  };

  useEffect(() => {
    if (profile) {
      const {
        firstName,
        email,
        lastName,
        facebookURL,
        website,
        phone,
        introduce,
      } = profile;
      const newForm = {
        firstName,
        password: "********",
        lastName,
        facebookURL,
        website,
        phone,
        introduce,
        email,
      };
      setForm(newForm);
      initalForm.current = newForm;
    }
  }, [profile]);

  return (
    <div className="tab__content-item" style={{ display: "block" }}>
      <form className="form">
        <div className="form-container">
          <Input
            label="Họ và tên"
            required
            placeholder="Họ và tên"
            {...register("firstName")}
          />

          <Input
            label="Số điện thoại"
            required
            placeholder="Số điện thoại"
            {...register("phone")}
          />
        </div>
        <div className="form-container">
          <Input
            label="Email"
            required
            placeholder="Email"
            {...register("email")}
            disabled
          ></Input>
          <Input
            label="Mật khẩu"
            required
            placeholder="Mật khẩu"
            {...register("password")}
            disabled
          ></Input>
        </div>
        <Input
          label="Facebook URL"
          required
          placeholder="Facebook URL"
          {...register("facebookURL")}
        />
        <Input
          label="Website"
          required
          placeholder="Website"
          {...register("website")}
        />{" "}
        <Input
          label="Giới thiệu bản thân"
          required
          renderInput={(inputProps) => {
            return <TextArea {...inputProps} />;
          }}
          {...register("introduce")}
        />
        <Button
          style={{
            width: "100%",
            pointerEvents: isChanged ? "all" : "none",
          }}
          variant="primary"
          onClick={_onSubmit}
          disabled={!isChanged}
        >
          Gửi
        </Button>
        {/* <div className="form-group">
          <div className="btnsubmit">
            <button className="btn btn--primary">Lưu lại</button>
          </div>
        </div> */}
      </form>
    </div>
  );
};

export default MyInfo;
