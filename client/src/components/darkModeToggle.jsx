import { useState, useEffect } from 'react'

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode)
}, [darkMode]);

  return (
    <button
        className="p-2 rounded font-bold bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:"
        onClick={() => setDarkMode(!darkMode)}
    >
        {darkMode ? 'Dark Mode' : 'Light Mode'}
    </button>
    );    
};

export default DarkModeToggle