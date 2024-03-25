import { Empty } from "antd";
import React, { useState } from "react";

const Accordion = ({ label = "", data = [] }) => {
  const [activeId, setActiveId] = useState("");
  const _onClickTitle = (e, id) => {
    e.stopPropagation();
    // console.log(`click id`, activeId);
    setActiveId(id !== activeId ? id : "");
  };
  return (
    <div className="accordion">
      {!!label && <h3 className="accordion__title label">{label}</h3>}
      {data?.length > 0 ? (
        data.map((item, index) => {
          const { id, title, content } = item || {};
          return (
            <div
              key={id || index}
              className={`accordion__content ${
                activeId === id ? "active" : ""
              }`}
            >
              <div
                className="accordion__content-title"
                onClick={(e) => _onClickTitle(e, id)}
              >
                <h4>
                  <strong>{title || ""}</strong>
                </h4>
              </div>
              <div className="accordion__content-text">{content || ""}</div>
            </div>
          );
        })
      ) : (
        <Empty
          description="Không có nội dung câu hỏi"
          style={{ margin: "0 auto" }}
        />
      )}
    </div>
  );
};

export default Accordion;
