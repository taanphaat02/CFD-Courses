import { useEffect } from "react";
import Button from "../../Button";
import { useAuthContext } from "../../../context/AuthContext";

const HeaderTop = ({ id, image, name, teacherInfo = {}, price, orderLink }) => {
  useEffect(() => {
    function showHeadCourseDetail() {
      let buttonRegister = $(".herodetail .btn");
      if (buttonRegister.length) {
        let headtop = $(".headtop");
        let headProgress = $(".headtop__progress");
        let offsetHead = buttonRegister.offset().top;
        let pageHeight = $(document).height() - $(window).height();
        let scrollTop = $(window).scrollTop(); // y

        let progress = (scrollTop / pageHeight) * 100;

        if (offsetHead <= scrollTop) {
          headtop.addClass("show");
        } else {
          headtop.removeClass("show");
        }
        headProgress.css({
          width: progress + "%",
        });
      }
    }
    function coursePage() {
      if ($(".coursedetailpage").length) {
        showHeadCourseDetail();
        $(window).on("scroll", function () {
          showHeadCourseDetail();
        });
      }
    }
    coursePage();
  }, [id]);

  const { profile, courseInfo } = useAuthContext();
  let isRegistered = true;

  {
    courseInfo?.length > 0 &&
      courseInfo.map((course) => {
        if (course?.course?.id === id) {
          isRegistered = true;
        } else {
          isRegistered = false;
        }
      });
  }
  return (
    <div className="headtop">
      <div className="container-fluid">
        <div className="headtop__left">
          <div className="headtop__left-avatar">
            <img src={image || ""} alt />
          </div>
          <div className="headtop__left-title">
            <h2>
              <strong>{name || ""}</strong>
            </h2>
            <p>{teacherInfo.name || ""}</p>
          </div>
        </div>
        <div className="headtop__right">
          <div className="headtop__right-price">
            <strong>{price} VND</strong>
          </div>
          {!isRegistered && (
            <Button link={orderLink} className="btn-regcourse">
              Đăng ký
            </Button>
          )}
          {isRegistered && (
            <>
              <div className="btn btn--primary btn-regcourse --disable">
                Đã đăng ký
              </div>
            </>
          )}
        </div>
      </div>
      <div className="headtop__progress" />
    </div>
  );
};

export default HeaderTop;
