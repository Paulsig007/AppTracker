import React from 'react';
import DarkModeToggle from './DarkModeToggle';
import JobInfoForm from './jobInfoForm'; // Ensure the correct import name
import appTrackerLogo from '../assets/images/AppTrackerLogo.png'
import { useQuery } from '@apollo/client';
import { QUERY_JOBS } from '../utils/queries';

const Header = () => {
  const [ showModal, setShowModal ] = React.useState(false);

  const { refetch } = useQuery(QUERY_JOBS);
  
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  }

  return (
    <header className="bg-gray-700 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src={appTrackerLogo} alt="AppTracker Logo" className="w-20 mr-2" />
          <h1 className="text-xl font-bold">AppTracker</h1>
        </div>

        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 mr-24 rounded"
          onClick={handleShowModal}
        >
          Add Position
        </button>

        <div>
          <DarkModeToggle />
        </div>
      </div>

      {showModal && <JobInfoForm handleCloseModal={handleCloseModal} refetchJobs={refetch} />}
    </header>
  );
};

export default Header;