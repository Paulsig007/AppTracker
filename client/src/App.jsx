import Header from './components/header'
import Table from './components/table';

function App() {

  return (
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
  )
}

export default App
