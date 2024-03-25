import PageLoading from "../../components/PageLoading";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Overlay from "../../components/Overlay";
import Footer from "../../components/Footer";
import { Outlet } from "react-router-dom";
import MainContextProvider from "../../context/MainContext";
import AuthContextProvider from "../../context/AuthContext";
import AuthModal from "../../components/AuthModal";

const MainLayout = () => {
  return (
    <MainContextProvider>
      <AuthContextProvider>
        {/* <PageLoading /> */}
        <Header />
        <Navbar />
        <Overlay />
        <Outlet />
        <Footer />
        <AuthModal />
      </AuthContextProvider>
    </MainContextProvider>
  );
};

export default MainLayout;
