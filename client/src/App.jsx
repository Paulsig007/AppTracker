import Header from './components/header'
import Table from './components/table';
import './styles/custom.css'
// import { LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs' 
// import dayjs from 'dayjs';

function App() {

  return (
    // <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="bg-white dark:bg-gray-900">
        <div className='
        max-w-screen-xl 
        min-h-screen
        mt-0 mb-0 mx-auto 
        p-8 
        text-center'>
          <Header />
          <Table />
        </div>
      </div>
    // </LocalizationProvider>
  )
}

export default App

