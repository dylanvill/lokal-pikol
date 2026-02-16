import type Photo from '../../shared/Photo';
import type CourtSlot from '../../shared/CourtSlot';

interface Court {
    id: string;
    name: string;
    covered: boolean;
    photos: Photo[];
    slots: CourtSlot[];
}

export default Court;
