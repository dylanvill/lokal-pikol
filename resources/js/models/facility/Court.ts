import type CourtPhoto from './CourtPhoto';
import type CourtSlot from './CourtSlot';

interface Court {
    uuid: string;
    name: string;
    covered: boolean;
    photos: CourtPhoto[];
    slots: CourtSlot[];
}

export default Court;
