import { Heading, RadioCard, SimpleGrid } from '@chakra-ui/react';

const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

interface FacilityNumberOfCourtsRadioCardProps {
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
    invalid?: boolean;
}

function FacilityNumberOfCourtsRadioCard({ value, onChange, disabled, invalid }: FacilityNumberOfCourtsRadioCardProps) {
    return (
        <RadioCard.Root
            name="numberOfCourts"
            value={value}
            onValueChange={(e) => onChange(e.value ?? '')}
            size="sm"
            variant="solid"
            disabled={disabled}
            invalid={invalid}
        >
            <RadioCard.Label>
                <span style={{ color: 'red' }}>*</span> Number of courts
            </RadioCard.Label>
            <SimpleGrid columns={{ base: 5 }} gap={4}>
                {options.map((option) => (
                    <RadioCard.Item
                        key={option}
                        value={option.toString()}
                        flex={1}
                        justifyContent="center"
                        alignItems="center"
                        padding={2}
                        borderWidth={1}
                        borderColor="gray.200"
                        borderRadius={8}
                    >
                        <RadioCard.ItemHiddenInput />
                        <RadioCard.ItemControl>
                            <RadioCard.ItemText fontFamily="mono" padding={0}>
                                <Heading>{option}</Heading>
                            </RadioCard.ItemText>
                        </RadioCard.ItemControl>
                    </RadioCard.Item>
                ))}
            </SimpleGrid>
        </RadioCard.Root>
    );
}

export default FacilityNumberOfCourtsRadioCard;
