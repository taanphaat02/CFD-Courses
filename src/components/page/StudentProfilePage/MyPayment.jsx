import { Empty } from "antd";
import { useAuthContext } from "../../../context/AuthContext";
import { formatCurrency, formatDate } from "../../../utils/format";

const MyPayment = () => {
  const { paymentInfo } = useAuthContext();
  return (
    <div className="tab__content-item" style={{ display: "block" }}>
      {!!!paymentInfo?.length > 0 ? (
        <Empty
          style={{ margin: "0 auto" }}
          description="Không có dữ liệu thanh toán"
        />
      ) : (
        <>
          {" "}
          {paymentInfo.map((item, index) => {
            const { course, id, paymentMethod, createdAt } = item;
            return (
              <div key={id} className="itemhistory">
                <div className="name">{course.name}</div>
                <div className="payment">{paymentMethod}</div>
                <div className="date">{formatDate(createdAt)}</div>
                <div className="money">{formatCurrency(course.price)}VND</div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default MyPayment;
