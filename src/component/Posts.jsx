import React, { useState, useEffect } from "react";
import { deletePost, getPost } from "../api/PostApi";
import Form from "./Form";

function Posts() {
  const [data, setData] = useState([]);
  const [updateData, setUpdateData] = useState({});


  const getPostData = async () => {
    try {
      const res = await getPost();
      setData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getPostData();
  }, []);

  const handleDeletePost = async (id) => {
    try {
      const res = await deletePost(id);
      if (res.status === 200) {
        setData(data.filter((post) => post.id !== id));
      } else {
        console.log("Failed to delete post:", res.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdatePost = (curData) => setUpdateData(curData);
 
  const displayedPosts = data.slice(90,100);

  return (
    <>
      <section>
        <Form data={data} setData={setData} updateData={updateData} setUpdateData={setUpdateData} />
      </section>

      <section className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-10">
        <div className="w-full max-w-6xl">
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedPosts.map((curData, index) => {
              const { id, title, body } = curData;
              return (
                <li key={id} className="bg-gray-800 p-6 rounded-lg shadow-lg transition-all hover:scale-105">
                  <p className="text-gray-400 text-sm">ID: {id}</p>
                  <h3 className="text-lg font-semibold text-purple-400 mb-2">📌 {title}</h3>
                  <p className="text-sm opacity-90 mb-4">{body}</p>
                  <div className="flex space-x-3">
                    <button onClick={() => handleUpdatePost(curData)} className="px-4 py-1 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all">
                      ✏️ Edit
                    </button>
                    <button onClick={() => handleDeletePost(id)} className="px-4 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all">
                      ❌ Delete
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

      </section>
    </>
  );
}

export default Posts;
