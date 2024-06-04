import { BrowserRouter, Route, Routes } from "react-router-dom";
import PATHS from "./constants/paths";
import { Suspense, lazy } from "react";

const CoursePage = lazy(() => import("./components/page/CoursePage"));
const Blog = lazy(() => import("./components/page/Blog"));
const BlogDetailPage = lazy(() => import("./components/page/BlogDetailPage"));
const StudentProfilePage = lazy(() =>
  import("./components/page/StudentProfilePage")
);
const ContactPage = lazy(() => import("./components/page/ContactPage"));
const AboutPage = lazy(() => import("./components/page/AboutPage"));
const PrivacyPage = lazy(() => import("./components/page/PrivacyPage"));
const Page404 = lazy(() => import("./components/page/Page404"));
const MyInfo = lazy(() =>
  import("./components/page/StudentProfilePage/MyInfo")
);
const MyCourse = lazy(() =>
  import("./components/page/StudentProfilePage/MyCourse")
);
const MyPayment = lazy(() =>
  import("./components/page/StudentProfilePage/MyPayment")
);
const MainLayout = lazy(() => import("./layout/MainLayout"));
const HomePage = lazy(() => import("./components/page/HomePage"));
const CourseDetailPage = lazy(() =>
  import("./components/page/CourseDetailPage")
);
const CourseOrderPage = lazy(() => import("./components/page/CourseOrderPage"));
const PaymentMethodPage = lazy(() =>
  import("./components/page/PaymentMethodPage")
);
const PrivateRoute = lazy(() => import("./components/PrivateRoute"));
// import CoursePage from "./components/page/CoursePage";
// import Blog from "./components/page/Blog";
// import BlogDetailPage from "./components/page/BlogDetailPage";
// import StudentProfilePage from "./components/page/StudentProfilePage";
// import ContactPage from "./components/page/ContactPage";
// import AboutPage from "./components/page/AboutPage";
// import PrivacyPage from "./components/page/PrivacyPage";
// import Page404 from "./components/page/Page404";
// import MyInfo from "./components/page/StudentProfilePage/MyInfo";
// import MyCourse from "./components/page/StudentProfilePage/MyCourse";
// import MyPayment from "./components/page/StudentProfilePage/MyPayment";
// import MainLayout from "./layout/MainLayout";
// import HomePage from "./components/page/HomePage";
// import CourseDetailPage from "./components/page/CourseDetailPage";
// import CourseOrderPage from "./components/page/CourseOrderPage";
// import PaymentMethodPage from "./components/page/PaymentMethodPage";
// import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Suspense fallback={<div className="loading"></div>}>
      <BrowserRouter>
        <Routes>
          <Route path={PATHS.HOME} element={<MainLayout />}>
            <Route index element={<HomePage />} />

            <Route path={PATHS.COURSE.INDEX} element={<CoursePage />}></Route>
            <Route
              path={PATHS.COURSE.DETAIL}
              element={<CourseDetailPage />}
            ></Route>

            <Route path={PATHS.BLOG.INDEX} element={<Blog />} />
            <Route path={PATHS.BLOG.DETAIL} element={<BlogDetailPage />} />

            {/* PRIVATE ROUTE */}
            <Route element={<PrivateRoute redirectPath={PATHS.HOME} />}>
              <Route path={PATHS.COURSE.ORDER} element={<CourseOrderPage />} />
              <Route
                path={PATHS.PROFILE.INDEX}
                element={<StudentProfilePage />}
              >
                <Route index element={<MyInfo />} />
                <Route path={PATHS.PROFILE.MY_COURSE} element={<MyCourse />} />
                <Route
                  path={PATHS.PROFILE.MY_PAYMENT}
                  element={<MyPayment />}
                />
              </Route>
            </Route>

            <Route path={PATHS.PAYMENT} element={<PaymentMethodPage />} />
            <Route path={PATHS.CONTACT} element={<ContactPage />} />
            <Route path={PATHS.ABOUT} element={<AboutPage />} />
            <Route path={PATHS.PRIVACY} element={<PrivacyPage />} />

            <Route path="*" element={<Page404 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
