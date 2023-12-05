import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
// import { UPDATE_JOB, REMOVE_JOB  } from '../utils/mutations';
import { QUERY_JOBS } from '../utils/queries';

import formatDate from '../utils/formatDate';

const Table = () => {



  // query jobs
  const { loading, error, data } = useQuery(QUERY_JOBS);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  console.log(data.jobs);
  // update job

  // remove job
  
  const tableHeaders = [
    { header: 'Company', key: "company"},
    { header: 'Job Title', key: "jobTitle"},
    { header: 'Company Link', key: "link"},
    { header: 'Date Applied', key: "dateApplied"},
    { header: 'Contact', key: "contact"},
    { header: 'Status', key: "status"},
    { header: 'Notes', key: "notes"}
  ];

  const jobs = data?.jobs || [];

  return (
    <div>
      <table className="min-w-full table-auto">
        <thead className="bg-gray-200">
          <tr>
            {tableHeaders.map((header) => (
              <th key={header.key} className="px-4 py-2">{header.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job._id}>
              {tableHeaders.map((header) => {
                if (header.key === 'dateApplied') {
                  return (
                    <td key={header.key} className="border px-4 py-2">
                      {formatDate(job[header.key])}
                    </td>
                  );
                } else if (header.key === 'link') {
                  return (
                    <td key={header.key} className="border px-4 py-2">
                      <a href={job[header.key]} 
                      className=
                      'text-blue-500 hover:text-blue-800 underline'
                      target="_blank" rel="noreferrer">Company Link</a>
                    </td>
                  );
                } else {
                  return (
                    <td key={header.key} className="border px-4 py-2">
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
    </div>
  );
};

export default Table;
