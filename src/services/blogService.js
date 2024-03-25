import axiosInstance from "../utils/axiosInstance";

export const blogService = {
  getBlogs(query = "") {
    return axiosInstance.get(`/blogs${query}`);
  },
  getCategories(query = "") {
    return axiosInstance.get(`/blog-categories${query}`);
  },
  getBlogBySlug(slug = "") {
    return axiosInstance.get(`/blogs/${slug}`);
  },
};
