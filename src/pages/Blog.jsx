import React, { useEffect, useState } from "react";

const Blog = () => {
  const [blogs, setBlogs] = useState({
    title: "",
    descriptions: "",
    author: "",
  });
  const [bloginfo, setbloginfo] = useState([]);

  /**
   * todo: Handle All inputs data from here.
   * @perams ({})
   * */
  const Handleinput = (items) => {
    setBlogs({ ...blogs, [items.target.id]: items.target.value });
  };
  /**
   * todo: submit data and create blog.
   * @perams ({})
   * */
  const handleSubmit = () => {
    if (!blogs.title || !blogs.descriptions || !blogs.author) {
      alert("Data missing");
    } else {
      setbloginfo([...bloginfo, blogs]);
      setBlogs({
        title: "",
        descriptions: "",
        author: "",
      });
    }
  };
  /**
   * todo: Set data in local Storage
   * */
  useEffect(() => {
    const storedBlogs = localStorage.getItem("blogs");
    if (storedBlogs) {
      setbloginfo(JSON.parse(storedBlogs));
    }
  }, []);

  /**
   * todo: get data from local Storage
   * */
  useEffect(() => {
    if (bloginfo.length > 0) {
      localStorage.setItem("blogs", JSON.stringify(bloginfo));
    }
  }, [bloginfo]);

  /**
   * todo: delete all data stored in local storage
   * **/
  const handleDeleteAll = () => {
    if (window.confirm("Are you sure you want to delete all blogs?")) {
      localStorage.removeItem("blogs"); // Clear local storage
      setbloginfo([]); // Clear the state
    }
  };

  return (
    <div className="flex h-full items-center justify-center bg-gradient-to-r  from-[#2a66f2] to-[#1ebcf1]">
      <div className="flex h-[80vh] w-2/3 items-center justify-center ">
        <div className="h-[100%]  w-1/2 bg-[#FFFDD0] p-8 shadow-xl">
          <h1 className="mb-8 text-center text-4xl font-bold text-[#333]">
            Submit Blog
          </h1>
          <input
            type="text"
            placeholder="Title"
            value={blogs.title}
            name="title"
            className="border-gray-300 focus:border-blue-500 mb-6 w-full rounded-lg border-b-2 bg-[#b9b68390] p-4 text-lg focus:outline-none"
            onChange={Handleinput}
            id="title"
          />
          <textarea
            placeholder="Description"
            className="border-gray-300 focus:border-blue-500 mb-6 w-full rounded-lg border-b-2 bg-[#b9b68390] p-4 text-lg focus:outline-none"
            rows="4"
            onChange={Handleinput}
            value={blogs.descriptions}
            id="descriptions"
          />
          <input
            type="text"
            placeholder="Author Name"
            className="border-gray-300 focus:border-blue-500 mb-6 w-full rounded-lg border-b-2 bg-[#b9b68390] p-4 text-lg focus:outline-none"
            onChange={Handleinput}
            value={blogs.author}
            id="author"
          />
          <button
            className="hover:bg-blue-600 w-full rounded-lg bg-btnColor p-4 text-xl text-white transition duration-300"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>

        {/* Right Side */}
        <div className="h-[100%] w-1/2 overflow-y-auto bg-white p-8">
          <div className="mb-8 flex items-center justify-between">
            <h1 className=" text-center text-4xl font-bold text-[#333]">
              Blog Posts
            </h1>
            <button
              className="hover:bg-red-600 rounded-lg  bg-darkBlue p-4 text-xl text-white transition duration-300"
              onClick={handleDeleteAll}
            >
              Delete All Blogs
            </button>
          </div>

          {bloginfo.length > 0 ? (
            bloginfo.map((items) => (
              <div className="mb-8 flex rounded-lg bg-[#f0f0f0] p-6 shadow-lg">
                <div className="ps-2 w-5/6">
                  <h2 className="text-2xl font-semibold capitalize text-[#333]">
                    {items.title}
                  </h2>
                  <p className="text-gray-700 mt-4">{items.descriptions}</p>
                  <p className="text-gray-500 mt-6 font-bold text-sm capitalize">
                    Author: {items.author}
                  </p>
                </div>
                <div className=" w-1/6 ">
                  <button className="rounded-md w-full mb-4 bg-[#1da81d]  px-2 py-2 capitalize text-white">
                    Edit
                  </button>
                  <button className="rounded-md w-full bg-[#ff0000]  px-2 py-2 capitalize text-white">
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="mt-16 text-center text-[30px] font-semibold text-white">
              No blogs submitted yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
