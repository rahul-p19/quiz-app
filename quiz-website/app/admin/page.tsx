"use client";
import React, { useState } from "react";
import AdminControls from "./clientCode";
import { addQuestion, deleteQuestion } from "./adminFunctions";

function Admin() {
  const [addFormData, setAddFormData] = useState({
    statement: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "",
    marks: "",
  });
  const [deleteFormData, setDeleteFormData] = useState({
    questionId: "",
  });

  const handleAddChange = (e: any) => {
    const { name, value } = e.target;
    setAddFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDeleteChange = (e: any) => {
    const { name, value } = e.target;
    setDeleteFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await addQuestion({
        statement: addFormData.statement,
        optionA: addFormData.optionA,
        optionB: addFormData.optionB,
        optionC: addFormData.optionC,
        optionD: addFormData.optionD,
        correctAnswer: addFormData.correctAnswer,
        marks: addFormData.marks,
      });

      if (response.ok) {
        alert("Question added successfully!");
        setAddFormData({
          statement: "",
          optionA: "",
          optionB: "",
          optionC: "",
          optionD: "",
          correctAnswer: "",
          marks: "",
        });
      } else {
        alert("Failed to add the question.");
      }
    } catch (error) {
      alert(`Error adding question: ${error}`);
    }
  };

  const handleDeleteSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const questionId = parseInt(deleteFormData.questionId);
      const response = await deleteQuestion(questionId);
      if (response.ok) {
        alert("Question deleted successfully!");
        setDeleteFormData({ questionId: "" });
      } else {
        alert("Failed to delete the question.");
      }
    } catch (error) {
      alert(`Error deleting question: ${error}`);
    }
  };


  return (
    <div className="min-h-screen w-full bg-black p-8">
      <h1 className="text-3xl font-bold text-center text-white mb-12">
        Admin Panel
      </h1>
      <AdminControls />

      <div className="flex flex-col sm:flex-row mt-20 justify-around w-full">
        {/* Add Question Form */}
        <form onSubmit={handleAddSubmit} className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Add Question
          </h2>
          <div className="grid gap-4">
            {/* Add Question Fields */}
            <div>
              <label className="block text-gray-300 font-medium mb-2">
                Statement:
              </label>
              <input
                type="text"
                name="statement"
                value={addFormData.statement}
                onChange={handleAddChange}
                placeholder="Enter question statement"
                className="w-full border-gray-600 bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {/* Options */}
              {["A", "B", "C", "D"].map((opt) => (
                <div key={opt}>
                  <label className="block text-gray-300 font-medium mb-2">
                    Option {opt}:
                  </label>
                  <input
                    type="text"
                    name={`option${opt}`}
                    // @ts-ignore
                    value={addFormData[`option${opt}`]}
                    onChange={handleAddChange}
                    placeholder={`Enter option ${opt}`}
                    className="w-full border-gray-600 bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              ))}
            </div>
            <div>
              <label className="block text-gray-300 font-medium mb-2">
                Correct Answer:
              </label>
              <select
                name="correctAnswer"
                value={addFormData.correctAnswer}
                onChange={handleAddChange}
                className="w-full border-gray-600 bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Correct Answer</option>
                {["A", "B", "C", "D"].map((opt) => (
                  <option key={opt} value={opt}>
                    Option {opt}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-300 font-medium mb-2">
                Marks:
              </label>
              <input
                type="number"
                name="marks"
                value={addFormData.marks}
                onChange={handleAddChange}
                placeholder="Enter marks"
                className="w-full border-gray-600 bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-6 w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Add Question
          </button>
        </form>

        {/* Delete Question Form */}
        <form onSubmit={handleDeleteSubmit} className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Delete Question
          </h2>
          <div className="grid gap-4">
            <div>
              <label className="block text-gray-300 font-medium mb-2">
                Question ID:
              </label>
              <input
                type="text"
                name="questionId"
                value={deleteFormData.questionId}
                onChange={handleDeleteChange}
                placeholder="Enter question ID"
                className="w-full border-gray-600 bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-6 w-full bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
          >
            Delete Question
          </button>
        </form>
      </div>
    </div>
  );
}

export default Admin;
