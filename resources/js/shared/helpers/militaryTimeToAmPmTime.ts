import dayjs from 'dayjs';

const militaryTimeToAmPmTime = (militaryTime: string): string => {
    const dateToday = dayjs().format('YYYY-MM-DD');
    const dateTime = dayjs(`${dateToday}T${militaryTime}`);
    return dateTime.format('h:mm A');
};

export default militaryTimeToAmPmTime;
