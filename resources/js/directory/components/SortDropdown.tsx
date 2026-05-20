import { NativeSelect, Text } from '@chakra-ui/react';

interface Props {
    value: string;
    onChange: (value: string) => void;
}

function SortDropdown({ value, onChange }: Props) {
    return (
        <>
            <Text fontSize="sm" color="gray.600">
                Sort by:
            </Text>
            <NativeSelect.Root size="sm" width="auto" minWidth="44">
                <NativeSelect.Field value={value} onChange={(e) => onChange(e.currentTarget.value)}>
                    <option value="">Default</option>
                    <option value="name">Name (A–Z)</option>
                    <option value="numberOfCourts">Most courts</option>
                    <option value="popularity">Most popular</option>
                    <option value="newlyAdded">Newly added</option>
                </NativeSelect.Field>
                <NativeSelect.Indicator />
            </NativeSelect.Root>
        </>
    );
}

export default SortDropdown;
