import { useNavigate } from "react-router-dom";
import ContactSideBar from "./ContactSideBar";
import ContactForm from "./ContactForm";
import ContactTitle from "./ContactTitle";
import useMutation from "../../../hook/useMutation";
import { subscribesService } from "../../../services/subscribesService";
import PATHS from "../../../constants/paths";
import { message } from "antd";

const ContactPage = () => {
  const navigate = useNavigate();

  const { execute, data, error, loading } = useMutation(
    subscribesService.subscribes
  );

  const handleFormSubmit = (formData) => {
    const payload = {
      name: formData?.name || "",
      email: formData?.email || "",
      phone: formData?.phone || "",
      title: formData?.topic || "",
      description: formData?.content || "",
    };
    execute?.(payload, {
      onSuccess: (data) => {
        console.log("data", data);
        message.success("Gửi yêu cầu hỗ trợ thành công");
        // navigate(PATHS.HOME);
      },
      onFail: (error) => {
        console.log("error", error);
      },
    });
  };

  return (
    <main className="mainwrapper contact --ptop">
      <div className="container">
        <ContactTitle />
      </div>
      <div className="contact__content">
        <div className="container">
          <div className="wrapper">
            <ContactSideBar />
            <ContactForm handleFormSubmit={handleFormSubmit} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
