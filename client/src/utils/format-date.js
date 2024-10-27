// helper function for formatting dates, e.g. semester start and end
export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-NZ', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
};
  

// helper function for formatting datetimes, e.g. bidding start and end
export const formatDatetime = (datetime) => {
    return new Date(datetime).toLocaleString('en-NZ', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};


export const formatDateForInput = (date) => {
    const newDate = new Date(date).toLocaleDateString('en-CA', { timeZone: 'Pacific/Auckland' });
    return newDate;
  };

  
export const formatTimeForInput = (datetime) => {
    const newTime = new Date(datetime).toLocaleTimeString('en-NZ', {
      timeZone: 'Pacific/Auckland',
      hour12: false,          
      hour: '2-digit',
      minute: '2-digit',
      second:'2-digit'
    });
  
    return newTime; 
};

