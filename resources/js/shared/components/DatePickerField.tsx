import { DatePicker, Portal } from '@chakra-ui/react';
import { type DateValue } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { LuCalendar } from 'react-icons/lu';

export interface DatePickerFieldProps extends Omit<React.ComponentProps<typeof DatePicker.Root>, 'value' | 'onValueChange' | 'format'> {
    value: DateValue;
    onValueChange: (value: DateValue) => void;
    label: string;
    format?: string;
}

function DatePickerField({ value, onValueChange, label, format = 'dddd, MMMM D, YYYY', ...props }: DatePickerFieldProps) {
    return (
        <DatePicker.Root
            value={[value]}
            onValueChange={(e) => e.value[0] && onValueChange(e.value[0])}
            format={(d) => dayjs(d.toString()).format(format)}
            {...props}
        >
            <DatePicker.Label>{label}</DatePicker.Label>
            <DatePicker.Control maxWidth="xs">
                <DatePicker.Trigger asChild unstyled textAlign="left">
                    <DatePicker.Input />
                </DatePicker.Trigger>
                <DatePicker.IndicatorGroup>
                    <DatePicker.Trigger>
                        <LuCalendar />
                    </DatePicker.Trigger>
                </DatePicker.IndicatorGroup>
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

export default DatePickerField;
