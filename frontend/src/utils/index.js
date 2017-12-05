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


// Took this guid generator function from https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript but stripped dashes
export function guid() {
    return s4() + s4() + s4() + s4() +
      s4() + s4() + s4() + s4();
}

function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
}