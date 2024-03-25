import React from "react";
import CourseItem from "../../CourseItem";
import Button from "../../Button";
import PATHS from "../../../constants/paths";
import { Empty } from "antd";

const CoursesSection = ({ courses = [], loading = false }) => {
  return (
    <section className="courses">
      <div className="container">
        <div className="heading">
          <h2 className="heading__title title --t2">
            Tất cả <span className="color--primary">khóa học</span>
          </h2>
        </div>
        <div className="courses__list">
          {!loading && courses?.length === 0 && (
            <Empty
              description="Không tìm thấy dữ liệu nào"
              style={{ margin: "0 auto" }}
            />
          )}
          {courses?.length > 0 &&
            !loading &&
            courses.map((course, index) => {
              return <CourseItem key={course?.id || index} {...course} />;
            })}
        </div>
        <div className="courses__btnall">
          <Button
            variant="grey"
            link={PATHS.COURSE.INDEX}
            className="course__btn"
          >
            Tất cả khoá học
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
