import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { REMOVE_JOB } from '../utils/mutations';
import { QUERY_JOBS } from '../utils/queries';
import { FaTrash } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import JobInfoForm from './jobInfoForm';

import formatDate from '../utils/formatDate';

const Table = () => {
  const [ showModal, setShowModal ] = useState(false);
  const { loading, error, data, refetch } = useQuery(QUERY_JOBS);
  const [removeJob, { error: removeError }] = useMutation(REMOVE_JOB);
  const [currentJob, setCurrentJob] = useState(null);
  
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  }


  // query jobs

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;


  console.log(data);

  // update job

  const handleSetCurrentJob = async (job) => {
    setCurrentJob(job);
    handleShowModal(true);
  };

  // remove job
  if (removeError) return `Error! ${removeError.message}`;

  const handleDelete = async (jobId) => {
    console.log("Deleting job with id: ", jobId);
    try {
      const { data } = await removeJob({
        variables: { _id: jobId },
      });
      refetch();
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };
  
  const tableHeaders = [
    { header: 'Company', key: "company"},
    { header: 'Job Title', key: "jobTitle"},
    { header: 'Company Link', key: "link"},
    { header: 'Date Applied', key: "dateApplied"},
    { header: 'Contact', key: "contact"},
    { header: 'Status', key: "status"},
    { header: 'Notes', key: "notes"},
    { header: 'Delete', key: "delete"},
    { header: 'Update', key: "update"}
  ];

  const jobs = data?.jobs || [];

  const sortedJobs = jobs.sort((a, b) => new Date(b.dateApplied) - new Date(a.dateApplied));

  return (
    <div className='flex'>
      {removeError && <p>Error in deleting job: {removeError.message}</p>}
      <table className="min-w-full table-auto">
        <thead className="bg-gray-300">
          <tr>
            {tableHeaders.map((header) => (
              <th key={header.key} className='px-4 py-2'>{header.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedJobs.map((job) => (
            <tr key={job._id}>
              {tableHeaders.map((header) => {
                if (header.key === 'dateApplied') {
                  return (
                    <td key={header.key} className="border-color border-2 px-4 py-2 dark:text-gray-300">
                      {formatDate(job[header.key])}
                    </td>
                  );
                } else if (header.key === 'link') {
                  return (
                    <td key={header.key} className="border-color border-2 px-4 py-2">
                      <a href={job[header.key]} 
                      className=
                      'text-blue-500 hover:text-blue-800 underline'
                      target="_blank" rel="noreferrer">Company Link</a>
                    </td>
                  );
                } else if (header.key === 'delete') {
                  return (
                    <td key={header.key} className="border-color border-2 px-4 py-2">
                      <button className="text-red-500 hover:text-red-800" onClick={() => handleDelete(job._id)}>
                        <FaTrash />
                      </button>
                    </td>
                  );
                } else if (header.key === 'update') {
                  return (
                    <td key={header.key} className="border-color border-2 px-4 py-2">
                      <button className="text-blue-500 hover:text-blue-800" onClick={()=> handleSetCurrentJob(job)}>
                        <FaEdit />
                      </button>
                    </td>
                  );
                } else {
                  return (
                    <td key={header.key} className="border-color border-2 px-4 py-2 dark:text-gray-300">
                      {job[header.key]}
                    </td>
                  )
                }
              }
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && <JobInfoForm job={currentJob} handleCloseModal={handleCloseModal} refetchJobs={refetch} />}
    </div>
  );
};

export default Table;
