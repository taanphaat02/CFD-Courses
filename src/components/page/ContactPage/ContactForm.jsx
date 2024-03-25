import { useState } from "react";
import Input from "../../Input";
import Button from "../../Button";
import Select from "../../Select";
import TextArea from "../../TextArea";

const EMAILREGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PHONEREGEX = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;

const ContactForm = ({ handleFormSubmit }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "",
    content: "",
  });
  const [error, setError] = useState({});

  // SUBMIT
  const _onSubmit = (e) => {
    e.preventDefault();
    const errorObject = {};

    if (!!!form.name) {
      errorObject.name = "Vui lòng nhập tên";
    }
    if (!!!form.topic) {
      errorObject.topic = "Vui lòng chọn chủ đề";
    }
    if (!!!form.content) {
      errorObject.content = "Vui lòng nhập nội dung";
    }
    if (!!!form.email) {
      errorObject.email = "Vui lòng nhập email";
    } else if (!EMAILREGEX.test(form.email)) {
      errorObject.email = "Vui lòng nhập đúng định dạng email";
    }

    if (!form.phone) {
      errorObject.phone = "Vui lòng nhập số điện thoại";
    } else if (!PHONEREGEX.test(form.phone)) {
      errorObject.phone = "Vui lòng nhập đúng định dạng số điện thoại VN";
    }

    setError(errorObject);

    if (Object.keys(errorObject).length > 0) {
      console.log("🚀Submit error---->", errorObject);
    } else {
      handleFormSubmit?.(form);
      console.log("🚀Submit success---->", form);
      setForm({
        name: "",
        email: "",
        phone: "",
        topic: "",
        content: "",
      });
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
  console.log("🚀form---->", form);

  return (
    <div className="form">
      <h3 className="title --t3">Gửi yêu cầu hỗ trợ</h3>
      <Input
        label="Họ và tên"
        required
        placeholder="Họ và tên"
        {...register("name")}
      />

      <Input
        label="Email"
        required
        placeholder="Email"
        {...register("email")}
      />

      <Input
        label="Phone"
        required
        placeholder="Phone"
        {...register("phone")}
      />

      <Input
        label="Chủ đề cần hỗ trợ"
        required
        renderInput={(inputProps) => {
          return (
            <Select
              options={[
                { value: "", label: "--" },
                { value: "react", label: "ReactJs" },
                { value: "responsive", label: "Web Responsive" },
              ]}
              {...inputProps}
            />
          );
        }}
        {...register("topic")}
      />

      <Input
        label="Nội dung"
        required
        renderInput={(inputProps) => {
          return <TextArea {...inputProps} />;
        }}
        {...register("content")}
      />

      <div className="btncontrol">
        <Button variant="primary" onClick={_onSubmit}>
          Gửi
        </Button>
      </div>
    </div>
  );
};

export default ContactForm;
