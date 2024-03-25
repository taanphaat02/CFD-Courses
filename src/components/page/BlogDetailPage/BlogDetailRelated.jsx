import React from "react";
import { Empty } from "antd";
import BlogItem from "../Blog/BlogItem";

const BlogDetailRelated = ({ blogs, loading = true }) => {
  return (
    <div className="blogdetail__related">
      <h2 className="blogdetail__related-title title --t2">
        Bài viết liên quan
      </h2>
      {!!blogs?.length && (
        <div className={`blog__list ${loading ? "is-loading" : "is-loaded"}`}>
          {blogs?.map((blog) => {
            return <BlogItem key={blog.id} {...blog} />;
          })}
        </div>
      )}
      {!loading && !blogs?.length && (
        <Empty description="Không có bài viết liên quan" />
      )}
    </div>
  );
};

export default BlogDetailRelated;
