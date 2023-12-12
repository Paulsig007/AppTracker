import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_JOB, UPDATE_JOB } from '../utils/mutations';
import formatDate from '../utils/formatDate';
import { FaWindowClose } from 'react-icons/fa';

const JobInfoForm = ({ job, handleCloseModal, refetchJobs }) => {
  const [formState, setFormState] = useState({
    company: '',
    jobTitle: '',
    link: '',
    dateApplied: '',
    contact: '',
    status: '',
    notes: '',
  });

  useEffect(() => {
    if (job) {
      setFormState({
        company: job.company,
        jobTitle: job.jobTitle,
        link: job.link,
        dateApplied: formatDate(job.dateApplied),
        contact: job.contact,
        status: job.status,
        notes: job.notes,
      });
    }
  }, [job]);


  const [addJob, { error:addError }] = useMutation(ADD_JOB);
  const [updateJob, { error:updateError }] = useMutation(UPDATE_JOB);

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  if (addError) return `Error! ${addError.message}`;
  if (updateError) return `Error! ${updateError.message}`;

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      if (job) {
        const {data} = await updateJob({
          variables: {
            _id: job._id,
            ...formState,
          },
        });
        console.log('Updated job: ', data);
      } else {
      const { data } = await addJob({
        variables: { ...formState },
      });
      console.log(data);
      }
      handleCloseModal();
      refetchJobs();
    } catch (err) {
      console.error(err);
    }
  }

  return (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">  
    <div className='bg-gray-50 p-4 rounded-lg shadow-lg max-w-md w-full'>
      <button className=" text-red-500 hover:text-red-800 ml-96 " onClick={handleCloseModal}>
          <FaWindowClose />
      </button>
      <form onSubmit={handleFormSubmit}>
        <div className="flex flex-col">
          <label htmlFor="company">Company</label>
          <input
            className='border-2 border-gray-500 rounded text-black'
            placeholder='Company Name'
            type="text"
            name="company"
            id="company"
            value={formState.company}
            onChange={handleFormChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="jobTitle">Job Title</label>
          <input
            className='border-2 border-gray-500 rounded text-black'
            placeholder='Job Title'
            type="text"
            name="jobTitle"
            id="jobTitle"
            value={formState.jobTitle}
            onChange={handleFormChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="link">Company Link</label>
          <input
            className='border-2 border-gray-500 rounded text-black'
            placeholder='Company Website'
            type="text"
            name="link"
            id="link"
            value={formState.link}
            onChange={handleFormChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="dateApplied">Date Applied</label>
          <input
            className='border-2 border-gray-500 rounded text-black'
            placeholder='Date Applied'
            type="text"
            name="dateApplied"
            id="dateApplied"
            value={formState.dateApplied}
            onChange={handleFormChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="contact">Contact</label>
          <input
            className='border-2 border-gray-500 rounded text-black'
            placeholder='Company Contacts (Who you know)'
            type="text"
            name="contact"
            id="contact"
            value={formState.contact}
            onChange={handleFormChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="status">Status</label>
          <input
            className='border-2 border-gray-500 rounded text-black'
            placeholder='Status (Pending, Interview, Offer, Rejected)'
            type="text"
            name="status"
            id="status"
            value={formState.status}
            onChange={handleFormChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="notes">Notes</label>
          <input
            className='border-2 border-gray-500 rounded text-black'
            placeholder='Notes'
            type="text"
            name="notes"
            id="notes"
            value={formState.notes}
            onChange={handleFormChange}
          />
        </div>
        
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 mt-4 rounded">
          {job ? 'Update Job' : 'Add Job'}
        </button>
      </form>  
    </div>  
  </div>
  );
}

export default JobInfoForm;