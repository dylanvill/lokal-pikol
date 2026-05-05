/** A YYYY-MM-DD format */
export type DateString = string;

/** A string in 24-hour time format HH:mm, e.g. 07:00 */
export type TimeString = string;

export interface Range {
    startTime: TimeString;
    endTime: TimeString;
}
