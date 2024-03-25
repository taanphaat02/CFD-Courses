import Button from "../../Button";
import FormOrder from "./FormOrder";
import InfoOrder from "./InfoOrder";
import PaymentOrder from "./PaymentOrder";
import useMutation from "../../../hook/useMutation";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../../utils/format";
import { ROLES } from "../../../constants/roles";
import { courseService } from "../../../services/courseService";
import { useAuthContext } from "../../../context/AuthContext";
import { orderService } from "../../../services/orderService";
import { message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import PATHS from "../../../constants/paths";

const EMAILREGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PHONEREGEX = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;

const CourseOrderPage = () => {
  const { courseSlug } = useParams();

  // INFO
  const { data: courseDetailData, execute: executeCourseDetail } = useMutation(
    courseService.getCourseBySlug
  );

  useEffect(() => {
    if (courseSlug) executeCourseDetail?.(courseSlug, {});
  }, [courseSlug]);

  const { teams, price, tags } = courseDetailData || {};

  const InfoOrderProps = {
    ...courseDetailData,
    teacherInfo: teams?.find((item) => item.tags.includes(ROLES.teacher) || {}),
    price: formatCurrency(price),
  };

  // FORM
  const navigate = useNavigate();
  const {
    profile,
    courseInfo,
    handleGetProfileCourse,
    handleGetProfilePayment,
  } = useAuthContext();

  const {
    firstName: profileName,
    email: profileEmail,
    phone: profilePhone,
  } = profile || {};

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    type: "",
  });

  const [error, setError] = useState({});

  const isAlreadyOrder =
    courseInfo?.some((item) => item?.course?.slug === courseSlug) || false;

  useEffect(() => {
    if (isAlreadyOrder && courseInfo?.length > 0) {
      const orderedCourse = courseInfo?.find(
        (item) => item?.course?.slug === courseSlug
      );
      setForm({
        name: orderedCourse.name || "",
        email: profileEmail,
        phone: orderedCourse.phone || "",
        type: orderedCourse.type || "",
      });
      setPaymentMethod(orderedCourse.paymentMethod);
    } else {
      setForm({
        name: profileName,
        email: profileEmail,
        phone: profilePhone,
        type: "",
      });
    }
  }, [profileName, profileEmail, profilePhone, isAlreadyOrder, courseInfo]);

  const register = (registerField) => {
    return {
      name: registerField,
      error: error[registerField],
      value: form[registerField],
      onChange: (e) => setForm({ ...form, [registerField]: e.target.value }),
    };
  };

  // PAYMENT
  const [paymentMethod, setPaymentMethod] = useState("");
  const handlePaymentMethodChange = (paychange) => {
    setPaymentMethod(paychange);
  };

  // onORDER
  const { loading: orderLoading, execute: orderCourse } = useMutation(
    orderService.orderCourse
  );

  const _onOrder = (e) => {
    e.preventDefault();
    const errorObject = {};

    if (!!!form.name) {
      errorObject.name = "Vui lòng nhập tên";
    }
    if (!!!form.type) {
      errorObject.type = "Vui lòng chọn hình thức học";
    }

    if (!!!form.email) {
      errorObject.email = "Vui lòng nhập email";
    } else if (!EMAILREGEX.test(form.email)) {
      errorObject.emaail = "Vui lòng nhập đúng định dạng email";
    }

    if (!form.phone) {
      errorObject.phone = "Vui lòng nhập số điện thoại";
    } else if (!PHONEREGEX.test(form.phone)) {
      errorObject.phone = "Vui lòng nhập đúng định dạng số điện thoại VN";
    }

    setError(errorObject);

    if (Object.keys(errorObject).length > 0) {
      console.log("Profile form validate error", errorObject);
    } else {
      if (paymentMethod) {
        const payload = {
          name: form.name,
          phone: form.phone,
          course: courseDetailData?.id,
          type: form.type,
          paymentMethod,
        };
        // console.log("🚀payload---->", payload);
        orderCourse(payload, {
          onSuccess: async () => {
            navigate(PATHS.PROFILE.MY_COURSE);
            await handleGetProfileCourse();
            await handleGetProfilePayment();
            message.success("Đăng ký khóa học thành công");

            // console.log("🚀payload---->", payload);
          },
          onFail: () => {
            message.error("Đăng ký khóa học thất bại");
          },
        });
      } else {
        message.error("Vui lòng chọn phương thức thanh toán");
      }
    }
  };

  return (
    <main className="mainwrapper --ptop">
      <section className="sccourseorder">
        <div className="container small">
          <InfoOrder {...InfoOrderProps} />
          <FormOrder
            register={register}
            types={tags}
            disabled={isAlreadyOrder}
          />
          <PaymentOrder
            selectedPayment={paymentMethod}
            handleChange={handlePaymentMethodChange}
            disabled={isAlreadyOrder}
          />
          {/* addclass --processing khi bấm đăng ký */}
          <Button
            className=""
            onClick={_onOrder}
            disabled={isAlreadyOrder}
            style={{ width: "100%" }}
          >
            <span>
              {isAlreadyOrder ? "Đã đăng ký khóa học" : "Đăng ký khoá học"}
            </span>
            {/* <svg
              version="1.1"
              id="L9"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 100 100"
              enableBackground="new 0 0 0 0"
              xmlSpace="preserve"
            >
              <path
                fill="#fff"
                d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
              >
                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="rotate"
                  dur="1s"
                  from="0 50 50"
                  to="360 50 50"
                  repeatCount="indefinite"
                />
              </path>
            </svg> */}
          </Button>
        </div>
      </section>
    </main>
  );
};

export default CourseOrderPage;
