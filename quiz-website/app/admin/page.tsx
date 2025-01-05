"use client";
import React, { useState, useEffect } from "react";
import AdminControls from "./clientCode";

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
  const [LeaderBoardLoading, setLeaderboardLoading] = useState(false);
  const [deleteFormData, setDeleteFormData] = useState({
    questionId: "",
  });
  const [leaderboard, setLeaderboard] = useState([]);
  const [displayLeaderBoard, setDisplayLeaderBoard] = useState(false);

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
      const response = await fetch("/api/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          statement: addFormData.statement,
          optionA: addFormData.optionA,
          optionB: addFormData.optionB,
          optionC: addFormData.optionC,
          optionD: addFormData.optionD,
          correctAnswer: addFormData.correctAnswer,
          marks: addFormData.marks,
        }),
      });
      const data = await response.json();
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
        alert(data.error || "Failed to add the question.");
      }
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  const handleDeleteSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/questions", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          questionId: deleteFormData.questionId,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Question deleted successfully!");
        setDeleteFormData({ questionId: "" });
      } else {
        alert(data.error || "Failed to delete the question.");
      }
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const fetchLeaderboard = async () => {
    setLeaderboardLoading(true); // Start loading
    try {
      const response = await fetch("/api/leaderboard", {
        method: "GET",
      });
      const data = await response.json();
      if (response.ok) {
        setLeaderboard(data.leaderboard || []);
        setDisplayLeaderBoard(true); // Show leaderboard
      } else {
        alert("Failed to fetch leaderboard.");
      }
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    } finally {
      setLeaderboardLoading(false); // Stop loading
    }
  };

  // Fetch leaderboard when displayLeaderBoard is true
  useEffect(() => {
    if (displayLeaderBoard) {
      fetchLeaderboard();
    }
  }, [displayLeaderBoard]);

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-4xl mx-auto bg-gray-800 shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Admin Panel
        </h1>
        <AdminControls />

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

        {/* Leaderboard */}
        {displayLeaderBoard && LeaderBoardLoading && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Leaderboard
            </h2>
            <table className="w-full table-auto bg-gray-700 text-white rounded-lg overflow-hidden">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Score</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((user: any, idx) => (
                  <tr key={idx}>
                    <td className="px-4 py-2 border">{user.name}</td>
                    <td className="px-4 py-2 border">{user.email}</td>
                    <td className="px-4 py-2 border">{user.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;
