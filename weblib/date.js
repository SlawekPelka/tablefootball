function getReadableDate(timestamp) {
    let date = new Date(timestamp);
    let day = date.getDay();
    let month = date.getMonth();
    let year = date.getFullYear();

    return `${day}/${month}/${year}`;
}