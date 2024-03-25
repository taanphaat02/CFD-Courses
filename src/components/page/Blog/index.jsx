import { useEffect, useState } from "react";
import useQuery from "../../../hook/useQuery";
import { blogService } from "../../../services/blogService";
import BlogMenu from "./BlogMenu";
import BlogList from "./BlogList";
import useMutation from "../../../hook/useMutation";
import useDebounce from "../../../hook/useDebounce";
import { Empty } from "antd";

const Blog = () => {
  const { data: categoryData } = useQuery(blogService.getCategories);
  const [selectedCategory, setSelectedCategory] = useState("");

  const queryString = selectedCategory ? `?category=${selectedCategory}` : "";

  console.log("🚀queryString---->", queryString);
  const {
    data: blogsData,
    loading: blogsLoading,
    execute: getBlogsByCategory,
    setData,
  } = useMutation((query) => blogService.getBlogs(query));

  const loadingDebounce = useDebounce(blogsLoading, 300);

  const blogs = blogsData?.blogs || {};

  const onFail = (error) => {
    console.log("error", error);
    setData([]);
  };

  useEffect(() => {
    getBlogsByCategory(queryString, {
      onFail: onFail,
    });
  }, [queryString]);

  return (
    <main className="mainwrapper blog --ptop">
      <div className="container">
        <div className="textbox">
          <div className="container">
            <h2 className="title --t2">Blog</h2>
          </div>
        </div>

        <BlogMenu
          categories={categoryData?.blogs}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <BlogList blogs={blogs} loading={loadingDebounce} />

        {/* <ul className="paging">
          <li>
            <a href="#">
              <i>
                <img src="/img/iconprev.svg" alt />
              </i>
            </a>
          </li>
          <li>
            <a href="#" className="active">
              1
            </a>
          </li>
          <li>
            <a href="#">2</a>
          </li>
          <li>
            <a href="#">3</a>
          </li>
          <li>
            <a href="#">4</a>
          </li>
          <li>
            <a href="#">
              <i>
                <img src="/img/iconprev.svg" alt />
              </i>
            </a>
          </li>
        </ul> */}
      </div>
    </main>
  );
};

export default Blog;
