import { Empty, Skeleton } from "antd";
import useQuery from "../../../hook/useQuery";
import { courseService } from "../../../services/courseService";
import CourseItem from "../../CourseItem";
import useDebounce from "../../../hook/useDebounce";

const CoursePage = () => {
  const { data: coursesData, loading: loadingCourse } = useQuery(
    courseService.getCourses
  );
  const { courses, pagination } = coursesData || {};
  // console.log("🚀courses---->", courses?.course);
  const loading = useDebounce(loadingCourse, 300);
  return (
    <main className="mainwrapper courses --ptop">
      <div className="container">
        <div className="textbox">
          <div className="container">
            <h2 className="title --t2">Tất cả khoá học</h2>
          </div>
        </div>
        <div className="courses__list">
          {!loadingCourse && courses.length === 0 && (
            <Empty
              description="Không có dữ liệu khóa học"
              style={{ margin: "0 auto" }}
            />
          )}
          {loading && <Skeleton active />}
          {courses?.length > 0 &&
            courses?.map((course, index) => {
              return <CourseItem key={course?.id || index} {...course} />;
            })}
        </div>
      </div>
    </main>
  );
};

export default CoursePage;
