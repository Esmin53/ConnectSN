export const relativetime = (timestamp) => {
    let createdAt;
    const date = new Date(timestamp);
    const today = new Date();
    const miliseconds = today - date;
    const seconds = Math.floor(miliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if(minutes < 1) {
        createdAt = `${seconds} ${seconds === 1 ? "second" : "seconds"} ago`;
    } else if (hours < 1) {
        createdAt = `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    } else if (hours < 24) {
        createdAt = `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else if (weeks < 1 && days !== 30) {
        createdAt = `${days} ${days === 1 ? "day" : "days"} ago`;
    } else if(weeks >= 1 && days <= 30 ){
        createdAt = `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
    } else if(days >= 30 && days < 365) {
        createdAt = createdAt = `${months} ${months === 1 ? "month" : "months"} ago`;
    } if(days >= 365) {
        createdAt = createdAt = `${years} ${years === 1 ? "year" : "years"} ago`;
    };

    return createdAt;
}