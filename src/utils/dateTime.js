
import moment from 'moment';

export const formatDate = (dateString) => {
    const date = new Date(dateString);
  
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}${day}`;
  }


export const formattedDate = moment(Date.now()).format('MMMM D, YYYY');


export const formatTime = (dateString)  => {
    const date = new Date(dateString);
  
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
  
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 => 12
  
    return `${hours}:${minutes} ${ampm}`;
  }


export const getElapsedTime = (dateString) => {
    const now = new Date();
    const pastDate = new Date(dateString);
    
    const diffInMs = now - pastDate; // Difference in milliseconds
    
    const hours = Math.floor(diffInMs / (1000 * 60 * 60)); // Convert ms to hours
    const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60)); // Remaining minutes
  
    return `${hours}:${String(minutes).padStart(2, '0')}`;
  }