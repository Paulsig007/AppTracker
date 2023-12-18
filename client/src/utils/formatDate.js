import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const formatDate = (isoString) => {
    const localDate = dayjs.utc(isoString).local();
    return localDate.format('MM/DD/YYYY');
  }

    export default formatDate;