import { HStack, Text, chakra } from '@chakra-ui/react';
import { LuCheck } from 'react-icons/lu';
import getContrastTextColor from '../../helpers/getContrastTextColor';
import { BRAND_COLOR_PALETTE } from '../../pages/availability/hooks/useBrandColor';

interface AvailabilityBrandColorPickerProps {
    value: string;
    onChange: (color: string) => void;
}

function AvailabilityBrandColorPicker({ value, onChange }: AvailabilityBrandColorPickerProps) {
    return (
        <HStack gap={3} flexWrap="wrap">
            <Text fontSize="sm" fontWeight="medium" color="gray.700">
                Image background
            </Text>
            <HStack gap={2} flexWrap='wrap'>
                {BRAND_COLOR_PALETTE.map((color) => {
                    const isSelected = color === value;
                    const checkColor = getContrastTextColor(color);
                    return (
                        <chakra.button
                            type="button"
                            key={color}
                            onClick={() => onChange(color)}
                            width="28px"
                            height="28px"
                            borderRadius="full"
                            bg={color}
                            borderWidth={isSelected ? '2px' : '1px'}
                            borderColor={isSelected ? 'blue.500' : 'gray.300'}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            cursor="pointer"
                            aria-label={`Select ${color}`}
                            _hover={{ transform: 'scale(1.1)' }}
                            transition="transform 0.1s"
                        >
                            {isSelected && <LuCheck color={checkColor} size={14} />}
                        </chakra.button>
                    );
                })}
            </HStack>
        </HStack>
    );
}

export default AvailabilityBrandColorPicker;
