import React, { useEffect } from "react";
import BlogItem from "./BlogItem";
import { Empty } from "antd";

const BlogList = ({ blogs, loading }) => {
  return (
    <>
      {!!blogs?.length && (
        <>
          <div className={`blog__list ${loading ? "is-loading" : "is-loaded"}`}>
            {blogs?.map((blog, index) => {
              return <BlogItem key={blog.id || index} {...blog} />;
            })}
          </div>
        </>
      )}
      {!loading && !blogs?.length && (
        <Empty description={"Không có dữ liệu bài viết"} />
      )}
    </>
  );
};

export default BlogList;
