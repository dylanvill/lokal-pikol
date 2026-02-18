import type Photo from "../../shared/Photo";

interface ReservationDashboardItem {
    id: string;
    courtName: string;
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    reservationDate: string;
    startTime: string;
    endTime: string;
    covered: boolean;
    paymentReceipt: Photo;
    createdAt: string;
}

export default ReservationDashboardItem;
