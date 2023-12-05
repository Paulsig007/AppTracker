import React from 'react';
import DarkModeToggle from './DarkModeToggle';
import JobInfoForm from './jobInfoForm'; // Ensure the correct import name
import appTrackerLogo from '../assets/images/AppTrackerLogo.png'

const Header = () => {
  const [showModal, setShowModal] = React.useState(false);

  const handleAddPosition = () => {
    setShowModal(true);
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src={appTrackerLogo} alt="AppTracker Logo" className="w-20 mr-2" />
          <h1 className="text-xl font-bold">AppTracker</h1>
        </div>

        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 mr-20 rounded"
          onClick={handleAddPosition}
        >
          Add Position
        </button>

         
        <div>
          <DarkModeToggle />
        </div>

      </div>

      <JobInfoForm showModal={showModal} setShowModal={setShowModal} />
    </header>
  );
};

export default Header;