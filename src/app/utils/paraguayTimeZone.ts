let paraguayTimezone = () => {
    let timezonePy : any = new Date().toString().match(/([-\+][0-9]+)\s/);
    return [timezonePy.slice(0,3), ':', timezonePy.slice(3)].join('')
}
export default paraguayTimezone;