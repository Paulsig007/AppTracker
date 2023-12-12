import { useState, useEffect } from 'react'

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode)
}, [darkMode]);

  return (
    <button
        className="p-2 rounded font-bold dark:bg-gray-200 bg-black dark:text-gray-800 text-gray-200 dark:hover:bg-gray-300 hover:"
        onClick={() => setDarkMode(!darkMode)}
    >
        {darkMode ? 'Light Mode' : 'Dark Mode'}
    </button>
    );    
};

export default DarkModeToggle