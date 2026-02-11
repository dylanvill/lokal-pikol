import type Photo from '../../shared/Photo';
import type CourtSlot from './CourtSlot';

interface Court {
    id: string;
    name: string;
    covered: boolean;
    photos: Photo[];
    slots: CourtSlot[];
}

export default Court;
