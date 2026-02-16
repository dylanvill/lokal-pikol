import type ReservationStatus from '../models/customer/reservation/ReservationStatus';

const statusColorParser = (status: ReservationStatus) => {
    switch (status) {
        case 'pending':
            return 'blue';
        case 'confirmed':
            return 'green';
        case 'cancelled':
            return 'red';
        case 'on hold':
            return 'orange';
        default:
            return 'gray';
    }
};

export default statusColorParser;