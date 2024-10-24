// helper function for formatting dates, e.g. semester start and end
export const formatDateForDisplay = (date) => {
    return new Date(date).toLocaleDateString('en-NZ', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
};
  

// helper function for formatting datetimes, e.g. bidding start and end
export const formatDatetimeForDisplay = (datetime) => {
    return new Date(datetime).toLocaleString('en-NZ', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};


export const formatDateWithoutTime = (date) => {
    return date.split('T')[0];
  };