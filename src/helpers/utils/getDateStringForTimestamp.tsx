function getDateStringForTimestamp(timestamp: number): string {
    const monthList = [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря'
    ];
    const date = new Date(timestamp);
    const d = '' + date.getDate();
    const m = monthList[date.getMonth()];
    const y = '' + date.getFullYear();
    const h = '' + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours());
    const min = '' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
    return `${d} ${m} ${y} ${h}:${min}`;
}

export default getDateStringForTimestamp;
