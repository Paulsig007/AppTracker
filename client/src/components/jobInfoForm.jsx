// JobInfoForm.jsx
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_JOB } from '../utils/mutations';

const JobInfoForm = ({ showModal, setShowModal }) => {
    const [values, setValues] = useState({ 
        company: '',
        jobTitle: '',
        link: '',
        dateApplied: '',
        contact: '',
        status: '',
        notes: ''
    });

    const [addJob, { error: addJobError, data: addJobData }] = useMutation(ADD_JOB);

    const addJobErrorText = addJobError ? 'Please be sure to Include Company Name, Job Title, Link to Company Website, and the Date of Application' : '';

    const handleFormChange = (e) => {
      const { name, value } = e.target;
        setValues({ 
          ...values,
          [name]: value});
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    try{
      addJob({
        variables: {
          ...values
        }
      });
      setShowModal(false);
    } catch (e) {
      console.error(e);
    };
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h3 className="text-lg font-bold">Add New Position</h3>

        {/* Display error message if there is an error */}
        {addJobError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{addJobErrorText}</span>
            </div>
          )}

          {/* Display success message if the data is returned */}
          {addJobData && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">Position added successfully!</span>
            </div>
          )}

        <form onSubmit={handleSubmit}>
          <input className="w-full p-2 m-2" 
          value={value.company} 
          name='company' 
          type="text"
          onChange={handleFormChange} 
          placeholder="Company" 
          />
          <input className="w-full p-2 m-2" 
          value={value.jobTitle} 
          name='jobTitle' 
          type="text" 
          onChange={handleFormChange} 
          placeholder="Job Title" 
          />
          <input className="w-full p-2 m-2" 
          value={value.link} 
          name='link' 
          type="url" 
          onChange={handleFormChange} 
          placeholder="Link to Company Website" 
          />
          <input className="w-full p-2 m-2" 
          value={value.dateApplied} 
          name='dateApplied' 
          type="date" 
          onChange={handleFormChange} 
          placeholder="Date Applied" 
          />
          <textarea className="w-full p-2 m-2" 
          value={value.contact} 
          name='contact' 
          onChange={handleFormChange} 
          placeholder="Contacts Information">
          </textarea>
          <input className="w-full p-2 m-2" 
          value={value.status} 
          name='status' 
          type="text" 
          onChange={handleFormChange} 
          placeholder="Status" 
          />
          <textarea className="w-full p-2 m-2" 
          value={value.notes} 
          name='notes' 
          onChange={handleFormChange} 
          placeholder="Notes">
          </textarea>
          <div className="flex justify-end">
            <button 
            type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2">
              Submit
            </button>
            <button onClick={() => setShowModal(false)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-2">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobInfoForm;
