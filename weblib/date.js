function getReadableDate(timestamp) {
    let d = new Date(timestamp);
    let day = d.getDay();
    let month = d.getMonth();
    let year = d.getFullYear();

    return `${day}/${month}/${year}`;
}