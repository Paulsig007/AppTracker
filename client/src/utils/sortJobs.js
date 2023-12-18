import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"

dayjs.extend(utc)
  
  const sortJobs = (a, b) => {
  const statusOrder = [ 'Rejected', 'Withdrew']

  // this checks if either job has a status of rejected or withdrew
  const aStatusIndex = statusOrder.indexOf(a.status)
  const bStatusIndex = statusOrder.indexOf(b.status)

  // if both jobs have a status of rejected or withdrew, don't change the order
  if(aStatusIndex && !bStatusIndex) return 1;
  if(!aStatusIndex && bStatusIndex) return -1;
  
  // if only one of the jobs has a status of rejected or withdrew, it should come after 
  const aDate = dayjs(a.lastUpdated).utc();
  const bDate = dayjs(b.lastUpdated).utc();
  
  // if neither job has a status of rejected or withdrew, sort by lastUpdated
  return bDate.isAfter(aDate) ? 1 : -1;
};


export default sortJobs;
