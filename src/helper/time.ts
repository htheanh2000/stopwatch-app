export const timeConverter = (UNIX_timestamp: number) => {
    const a = new Date(UNIX_timestamp);
    const hour = formatTime(a.getHours() - 8)
    const min = formatTime(a.getMinutes())
    const sec = formatTime(a.getSeconds())
    const mili = formatTime(a.getMilliseconds() / 10)
    const time = hour + ':' + min + ':' + sec + ':' + mili;
    return time;
}
const formatTime = (time: number) => {
    return ('00' + time).toString().substr(-2);
}