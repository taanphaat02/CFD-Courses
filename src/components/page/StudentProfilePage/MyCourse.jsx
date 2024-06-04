import { Empty } from "antd";
import { useAuthContext } from "../../../context/AuthContext";
import CourseItem from "../../CourseItem";
import { COURSE_ITEM_TYPE } from "../../../constants/general";
import { useEffect } from "react";

const MyCourse = () => {
  const { courseInfo, handleGetProfileCourse, handleGetProfilePayment } =
    useAuthContext();

  return (
    <div className="tab__content-item" style={{ display: "block" }}>
      <div className="courses__list">
        {!!!courseInfo.length > 0 ? (
          <Empty
            style={{ margin: "0 auto" }}
            description="Không có dữ liệu khóa học"
          />
        ) : (
          <>
            {courseInfo.map((item, index) => {
              return (
                // <div key={index} className="courses__list-item">
                //   <div className="img">
                //     <a href="course-detail.html">
                //       <img
                //         src="https://cfdcircle.vn/files/thumbnails/ahvVmtDlrzUPhKLDrc4YkdA8iFbACauYCN76TSGs.jpg"
                //         alt="Khóa học CFD"
                //         className="course__thumbnail"
                //       />
                //       <span className="course__img-badge badge">
                //         Offline | Online
                //       </span>
                //     </a>
                //   </div>
                //   <div className="content">
                //     <p className="label">Front-End</p>
                //     <h3 className="title --t3">
                //       <a href="course-detail.html">Frontend Newbie</a>
                //     </h3>
                //     <div className="content__info">
                //       <div className="user">
                //         <div className="user__img">
                //           <img
                //             src="/img/avatar_nghia.jpg"
                //             alt="Avatar teacher"
                //           />
                //         </div>
                //         <p className="user__name">Trần Nghĩa</p>
                //       </div>
                //       <div className="price">
                //         <strong>4.500.000đ</strong>
                //       </div>
                //     </div>
                //     <div className="content__action">
                //       <a href="course-order.html" className="btn btn--primary">
                //         Đăng ký ngay
                //       </a>
                //       <a href="course-detail.html" className="btn btn--default">
                //         <img src="/img/icon-paper.svg" alt="icon paper" />
                //       </a>
                //     </div>
                //   </div>
                // </div>
                <CourseItem
                  key={item.id || new Date().getTime() + index}
                  type={COURSE_ITEM_TYPE.normal}
                  {...item?.course}
                />
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default MyCourse;
