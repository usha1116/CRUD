import React, { useEffect, useState } from "react";
import { postData, editData } from "../api/PostApi";

function Form({ data, setData, updateData, setUpdateData }) {
  const [addData, setAddData] = useState({ title: "", body: "" });

  useEffect(() => {
    if (updateData) {
      setAddData({ title: updateData.title || "", body: updateData.body || "" });
    }
  }, [updateData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddData((prev) => ({ ...prev, [name]: value }));
  };

  const addPostData = async () => {
    try {
      const res = await postData(addData);
      if (res.status === 201) {
        setData([...data, res.data]);
        setAddData({ title: "", body: "" });
      }
    } catch (error) {
      console.log("Error adding post:", error);
    }
  };

  const updatePostData = async () => {
    try {
      const res = await editData(updateData.id, addData);
      if (res.status === 200) {
        setData((prev) =>
          prev.map((curData) => (curData.id === updateData.id ? res.data : curData))
        );
        setUpdateData({});
        setAddData({ title: "", body: "" });
      }
    } catch (error) {
      console.log("Error updating post:", error);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    updateData.id ? updatePostData() : addPostData();
  };

  return (
    <section className="bg-gray-900 flex justify-center py-6">
    <div className="w-full max-w-4xl bg-gray-800 p-5 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-purple-400 text-center mb-4">
        {updateData.id ? "✏️ Edit Post" : "📝 Add Post"}
      </h2>
      <form className="flex space-x-4 items-end" onSubmit={handleFormSubmit}>
        <div className="flex-1">
          <label htmlFor="title" className="block text-gray-300 font-medium mb-1">
            Title
          </label>
          <input
            type="text"
            autoComplete="off"
            id="title"
            name="title"
            placeholder="Enter title"
            className="w-full px-3 py-1.5 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm text-white"
            value={addData.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex-1">
          <label htmlFor="body" className="block text-gray-300 font-medium mb-1">
            Post
          </label>
          <textarea
            id="body"
            name="body"
            placeholder="Write something..."
            rows="1"
            className="w-full px-3 py-1.5 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm text-white resize-none"
            value={addData.body}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-purple-500 text-white py-2 px-5 rounded-md shadow-md hover:bg-purple-600 transition-all text-sm font-semibold"
        >
          {updateData.id ? "✏️ Edit Post" : "➕ Add Post"}
        </button>
      </form>
    </div>
  </section>
  
  );
}

export default Form;
