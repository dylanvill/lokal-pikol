export type DayOfTheWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface CreateBlockReservationFormInterface {
    name: string;
    courts: string[];
    days: DayOfTheWeek[];
    slots: string[];
}
