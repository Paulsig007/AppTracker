import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_JOB, UPDATE_JOB } from '../utils/mutations';
import dayjs from 'dayjs';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import utc from 'dayjs-plugin-utc';
import { FaWindowClose } from 'react-icons/fa';
import '../styles/custom.css';

dayjs.extend(utc);

// const formatDate = (date) => dayjs(date).format('MM/DD/YYYY');

const JobInfoForm = ({ job, handleCloseModal, refetchJobs }) => {
  const [formState, setFormState] = useState({
    company: '',
    jobTitle: '',
    link: '',
    dateApplied: new Date(),
    contact: '',
    status: '',
    notes: '',
  });
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    if (job) {
      const jobDate = new Date(job.dateApplied);
      setFormState({
        company: job.company,
        jobTitle: job.jobTitle,
        link: job.link,
        dateApplied: jobDate,
        contact: job.contact,
        status: job.status,
        notes: job.notes,
      });
    }
  }, [job]);

  const handleDateChange = (date) => {
    setFormState(prevState => ({
      ...prevState,
      dateApplied: date,
    }));
  };

  const [addJob, { error: addError }] = useMutation(ADD_JOB);
  const [updateJob, { error: updateError }] = useMutation(UPDATE_JOB);

  const handleFormChange = (event) => {
    const { 
      name, 
      value } = event.target;
    setFormState(prevState => ({
      ...prevState,
      [
        name]: 
        value,
    }));
  };

  if (addError) return `Error! ${addError.message}`;
  if (updateError) return `Error! ${updateError.message}`;

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const utcDate = dayjs(formState.dateApplied).utc().format('MM/DD/YYYY');
    const submissionData = { ...formState, dateApplied: utcDate };

    try {
      await submitJobData(submissionData);
      handleCloseModal();
      refetchJobs();
    } catch (err) {
      console.error(err);
    }
  };

  const submitJobData = async (submissionData) => {
    if (job) {
      await updateJob({
        variables: { _id: job._id, ...submissionData },
      });
    } else {
      await addJob({ variables: submissionData });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
      <div className='bg-gray-50 p-4 rounded-lg shadow-lg max-w-md w-full'>
        <CloseButton handleCloseModal={handleCloseModal} />
        <JobForm 
          formState={formState}
          selectedDate={selectedDate}
          handleDateChange={handleDateChange}
          handleFormChange={handleFormChange}
          handleFormSubmit={handleFormSubmit}
        />
      </div>
    </div>
  );
};

const CloseButton = ({ handleCloseModal }) => (
  <Button 
    className='text-red-700 hover:text-red-800 ml-96'
    color="secondary" 
    onClick={handleCloseModal}
    startIcon={<FaWindowClose />}
  >
    Close
  </Button>
);

const JobForm = ({ formState, handleDateChange, handleFormChange, handleFormSubmit }) => (
  <form onSubmit={handleFormSubmit}>
    <TextField 
    label="Company" 
    name="company" 
    value={formState.company} 
    onChange={handleFormChange} 
    margin="normal" 
    fullWidth 
    />
    <TextField 
    label="Job Title" 
    name="jobTitle" 
    value={formState.jobTitle} 
    onChange={handleFormChange} 
    margin="normal" 
    fullWidth 
    />
    <TextField 
    label="Company Link" 
    name="link" 
    value={formState.link} 
    onChange={handleFormChange} 
    margin="normal" 
    fullWidth 
    />
    <ReactDatePicker 
    wrapperClassName="w-full"
    selected={formState.dateApplied} 
    onChange={handleDateChange} 
    dateFormat="MM/dd/yyyy" 
    className="border-color border-2 px-4 py-2 text-black border-blue-600 rounded" 
    />
    <TextField 
    label="Contact" 
    name="contact" 
    value={formState.contact} 
    onChange={handleFormChange} 
    margin="normal" 
    fullWidth 
    />
    <StatusSelect status={formState.status} handleFormChange={handleFormChange} 
    />
    <TextField 
    label="Notes" 
    name="notes" 
    value={formState.notes} 
    onChange={handleFormChange} 
    margin="normal" 
    fullWidth multiline 
    />
    <SubmitButton />
  </form>
);

const StatusSelect = ({ status, handleFormChange }) => (
  <FormControl 
  fullWidth 
  margin="normal">
    <InputLabel>Status</InputLabel>
    <Select 
    label="Status" 
    name="status" 
    value={status} 
    onChange={handleFormChange}>
      {['Applied', 'Interview Scheduled', 'Round 1 Complete', 'Round 2 Complete', 'Round 3 Complete', 'Offer Made', 'Rejected', 'Accepted', 'Declined', 'Withdrew'].map(statusOption => (
        <MenuItem key={statusOption} 
        value={statusOption}>{statusOption}</MenuItem>
      ))}
    </Select>
  </FormControl>
);

const SubmitButton = () => (
  <Button type="submit" variant="contained" color="primary" className="mt-4">
    Submit
  </Button>
);

export default JobInfoForm;