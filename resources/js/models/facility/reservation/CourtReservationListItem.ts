import type CourtSlot from '../../shared/CourtSlot';

export interface CourtReservationListItem {
    id: string;
    name: string;
    covered: boolean;
    slots: CourtSlot[];
}

export default CourtReservationListItem;
