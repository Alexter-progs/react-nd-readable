export function formatDate(timestamp) {
    let date = new Date(timestamp);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();

    return `${year}/${month}/${day} ${hours}:${minutes}`
}

export function capitalize(value) {
    if(value && typeof value === 'string') {
        return value.charAt(0).toUpperCase() + value.slice(1)
    } else {
        return value
    }
}