import { Empty } from "antd";
import React from "react";

const BlogDetailContent = ({ id, image, description, loading = true }) => {
  return (
    <>
      {!!id && (
        <div className="blogdetail__content">
          <img
            src={
              image ||
              "https://cfdcourses.cfdcircle.vn/images/blog/oCbb35rOM1FsNEYqcOLIk-Screenshot 2024-03-06 at 19.57.08.png"
            }
            alt="Post thumnail"
          />
          <div
            className="blogdetail__content-entry"
            dangerouslySetInnerHTML={{ __html: description }}
          ></div>
          <div className="blogdetail__line" />
          <div className="blogdetail__content-social btngroup">
            <a href="#" className="btn btn-fb">
              <img src="/img/icon-fb-share.svg" alt />
              <span>Share</span>
            </a>
            <a href="#" className="btn btn-linkedin">
              <img src="/img/icon-in-share.svg" alt />
              <span>Share</span>
            </a>
          </div>
        </div>
      )}
      {!loading && !id && <Empty description="Không có dữ liệu bài viết" />}
    </>
  );
};

export default BlogDetailContent;
