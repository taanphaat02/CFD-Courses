import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { MODAL_TYPES } from "../../constants/general";
import { useAuthContext } from "../../context/AuthContext";

const AuthModal = () => {
  const { showedModal, handleCloseModal } = useAuthContext();
  return (
    <>
      <div className={`modal modallogin ${showedModal ? "open" : ""}`}>
        <div className="modal__wrapper">
          <div className="modal__wrapper-close" onClick={handleCloseModal}>
            <img src="/img/close_icon.svg" alt="CFD Register" />
          </div>
          {showedModal === MODAL_TYPES.login && <LoginForm />}
          {showedModal === MODAL_TYPES.register && <RegisterForm />}
        </div>
        <div className="modal__overlay" onClick={handleCloseModal} />
      </div>
    </>
  );
};

export default AuthModal;
