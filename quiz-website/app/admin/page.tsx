"use client"
import React, { useState } from 'react';
import AdminControls from './clientCode';

function Admin() {
  const [addFormData, setAddFormData] = useState({
    statement: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
  });

  const [deleteFormData, setDeleteFormData] = useState({
    questionId: '',
  });

  const handleAddChange = (e : any) => {
    const { name, value } = e.target;
    setAddFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDeleteChange = (e:any) => {
    const { name, value } = e.target;
    setDeleteFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddSubmit = (e : any) => {
    e.preventDefault();
    console.log('Adding Question:', addFormData);

  };

  const handleDeleteSubmit = (e:any) => {
    e.preventDefault();
    console.log('Deleting Question ID:', deleteFormData.questionId);

  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <AdminControls />

      {/* Add Question Form */}
      <form onSubmit={handleAddSubmit}>
        <h2>Add Question</h2>
        <div>
          <label>Statement:</label>
          <input
            type="text"
            name="statement"
            value={addFormData.statement}
            onChange={handleAddChange}
            placeholder="Enter question statement"
            required
          />
        </div>
        <div>
          <label>Option A:</label>
          <input
            type="text"
            name="optionA"
            value={addFormData.optionA}
            onChange={handleAddChange}
            placeholder="Enter option A"
            required
          />
        </div>
        <div>
          <label>Option B:</label>
          <input
            type="text"
            name="optionB"
            value={addFormData.optionB}
            onChange={handleAddChange}
            placeholder="Enter option B"
            required
          />
        </div>
        <div>
          <label>Option C:</label>
          <input
            type="text"
            name="optionC"
            value={addFormData.optionC}
            onChange={handleAddChange}
            placeholder="Enter option C"
            required
          />
        </div>
        <div>
          <label>Option D:</label>
          <input
            type="text"
            name="optionD"
            value={addFormData.optionD}
            onChange={handleAddChange}
            placeholder="Enter option D"
            required
          />
        </div>
        <button type="submit">Add Question</button>
      </form>

      {/* Delete Question Form */}
      <form onSubmit={handleDeleteSubmit}>
        <h2>Delete Question</h2>
        <div>
          <label>Question ID:</label>
          <input
            type="text"
            name="questionId"
            value={deleteFormData.questionId}
            onChange={handleDeleteChange}
            placeholder="Enter question ID"
            required
          />
        </div>
        <button type="submit">Delete Question</button>
      </form>
    </div>
  );
}

export default Admin;
