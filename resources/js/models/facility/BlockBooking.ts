interface BlockBooking {
    id: string;
    name: string;
    startTime: string;
    endTime: string;
    day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
}

export default BlockBooking;
