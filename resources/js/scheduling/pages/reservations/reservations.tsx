import ReservationEventDialog from '../../components/reservations/ReservationEventDialog';
import ReservationsCalendar from '../../components/reservations/ReservationsCalendar';
import ReservationsEmptyState from '../../components/reservations/ReservationsEmptyState';
import SchedulingLayout from '../../layouts/SchedulingLayout';
import type ReservationCalendarItem from '../../models/ReservationCalendarItem';
import type SchedulingPageProps from '../../types/SchedulingPageProps';
import type { UuidString } from '../../types/String';
import useReservationsPage from './hooks/useReservationsPage';

interface ReservationsPageProps extends SchedulingPageProps {
    courts: Array<{ id: UuidString; name: string }>;
    selectedCourtId: UuidString | null;
    selectedMonth: string;
    calendarItems: ReservationCalendarItem[];
}

function ReservationsPage({ courts, selectedCourtId, selectedMonth, calendarItems }: ReservationsPageProps) {
    const { selectedItem, setSelectedItem, view, setView, date, formattedDate, handleCourtChange, handleNavigate } =
        useReservationsPage(selectedCourtId, selectedMonth);

    if (courts.length === 0) {
        return (
            <SchedulingLayout title="Reservations">
                <ReservationsEmptyState />
            </SchedulingLayout>
        );
    }

    return (
        <SchedulingLayout title="Reservations">
            <ReservationsCalendar
                courts={courts}
                selectedCourtId={selectedCourtId}
                calendarItems={calendarItems}
                view={view}
                date={date}
                formattedDate={formattedDate}
                onView={setView}
                onNavigate={handleNavigate}
                onSelectEvent={setSelectedItem}
                onCourtChange={handleCourtChange}
            />
            {selectedItem !== null && (
                <ReservationEventDialog item={selectedItem} onClose={() => setSelectedItem(null)} />
            )}
        </SchedulingLayout>
    );
}

export default ReservationsPage;
