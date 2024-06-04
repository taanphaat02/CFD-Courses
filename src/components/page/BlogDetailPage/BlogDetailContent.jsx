import PATHS from "@/constants/paths";
import { Empty } from "antd";
import React from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

const BlogDetailContent = ({
  id,
  image,
  description,
  loading = true,
  slug,
}) => {
  const urlShare = window.location.href;
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
          <div
            className="blogdetail__content-social btngroup"
            style={{ gap: 20 }}
          >
            <FacebookShareButton url={urlShare} quote="share">
              <FacebookIcon />
            </FacebookShareButton>
            <TwitterShareButton url={urlShare} quote="share">
              <TwitterIcon />
            </TwitterShareButton>
            <LinkedinShareButton url={urlShare} quote="share">
              <LinkedinIcon />
            </LinkedinShareButton>
          </div>
        </div>
      )}
      {!loading && !id && <Empty description="Không có dữ liệu bài viết" />}
    </>
  );
};

export default BlogDetailContent;
