import { DatePicker, type DateValue, Flex, Heading, parseDate, Portal } from '@chakra-ui/react';
import { LuSquareChevronDown } from 'react-icons/lu';
import { type DateString } from '../../types/DateTime';

type DateView = 'day' | 'month' | 'year';
export interface ValueChangeDetails {
    value: DateValue[];
    valueAsString: string[];
    view: DateView;
}

export interface CourtPageDatePickerProps {
    date: DateString;
    dateDisplay: string;
    onValueChange: (details: ValueChangeDetails) => void;
}

function CourtPageDatePicker({ date, dateDisplay, onValueChange }: CourtPageDatePickerProps) {
    return (
        <DatePicker.Root value={[parseDate(date)]} onValueChange={(e) => e.value[0] && onValueChange(e)}>
            <DatePicker.Control>
                <DatePicker.Trigger width="full">
                    <Flex width="full" alignItems="center">
                        <LuSquareChevronDown color="black" />
                        <Heading textAlign="left" size="2xl" color="black" marginLeft={2}>
                            {dateDisplay}
                        </Heading>
                    </Flex>
                </DatePicker.Trigger>
            </DatePicker.Control>
            <Portal>
                <DatePicker.Positioner>
                    <DatePicker.Content>
                        <DatePicker.View view="day">
                            <DatePicker.Header />
                            <DatePicker.DayTable />
                        </DatePicker.View>
                        <DatePicker.View view="month">
                            <DatePicker.Header />
                            <DatePicker.MonthTable />
                        </DatePicker.View>
                        <DatePicker.View view="year">
                            <DatePicker.Header />
                            <DatePicker.YearTable />
                        </DatePicker.View>
                    </DatePicker.Content>
                </DatePicker.Positioner>
            </Portal>
        </DatePicker.Root>
    );
}

export default CourtPageDatePicker;
