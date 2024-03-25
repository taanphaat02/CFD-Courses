import { useParams } from "react-router-dom";

import useMutation from "../../../hook/useMutation";
import { blogService } from "../../../services/blogService";
import BlogDetailTitle from "./BlogDetailTitle";
import BlogDetailContent from "./BlogDetailContent";
import BlogDetailRelated from "./BlogDetailRelated";
import { useEffect } from "react";
import useDebounce from "../../../hook/useDebounce";

const BlogDetailPage = () => {
  const { blogSlug } = useParams();

  // DETAIL
  const {
    data: blogDetail,
    loading: blogDetailLoading,
    execute: getBlogDetail,
  } = useMutation(blogService.getBlogBySlug);

  useEffect(() => {
    !!blogSlug && getBlogDetail(blogSlug);
  }, [blogSlug]);

  const blogProps = blogDetail || {};

  // RALATED
  const {
    data: blogsRelated,
    loading: blogsRelatedLoading,
    execute: getBlogsRelated,
  } = useMutation((query) => blogService.getBlogs(query));

  const categoryId = blogProps?.category?.id || "";

  const queryString = categoryId ? `?category=${categoryId}&limit=3` : "";

  const loadingAPI = blogDetailLoading || blogsRelatedLoading;
  const loadingPage = useDebounce(loadingAPI, 300);

  useEffect(() => {
    if (queryString) {
      getBlogsRelated(queryString);
    }
  }, [queryString]);

  return (
    <main className="mainwrapper blogdetail --ptop">
      <div className="container">
        <div className="wrapper">
          <BlogDetailTitle {...blogProps} />
          <BlogDetailContent {...blogProps} loading={loadingPage} />
        </div>
        {queryString && (
          <BlogDetailRelated
            blogs={blogsRelated?.blogs}
            loading={loadingPage}
          />
        )}
      </div>
    </main>
  );
};

export default BlogDetailPage;
