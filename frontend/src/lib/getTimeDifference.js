 // Function to calculate the difference between two time strings in "HH:mm" format
 export const getTimeDifference = (startTime, endTime) => {
    if (!startTime || !endTime) return '';

    // Split the time strings into hours and minutes
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);

    // Convert both times to total minutes
    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;

    // Calculate the difference in minutes
    let differenceInMinutes = endTotalMinutes - startTotalMinutes;

    // Handle if endTime is earlier than startTime (crosses midnight)
    if (differenceInMinutes < 0) {
      differenceInMinutes += 24 * 60; // Add 24 hours worth of minutes
    }

    // Convert the difference back to hours and minutes
    const hours = Math.floor(differenceInMinutes / 60);
    const minutes = differenceInMinutes % 60;

    // Handle singular/plural forms for hours and minutes
    const hoursLabel = hours === 1 ? 'hour' : 'hours';
    const minutesLabel = minutes === 1 ? 'minute' : 'minutes';
  
    return `${hours} ${hoursLabel} and ${minutes} ${minutesLabel}`;
  };