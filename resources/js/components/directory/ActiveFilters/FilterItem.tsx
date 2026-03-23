import { Tag } from '@chakra-ui/react';
import { LuX } from 'react-icons/lu';

interface FilterItemProps {
    icon: React.ReactNode;
    label: string;
    onRemove: () => void;
}

function FilterItem({ icon, label, onRemove }: FilterItemProps) {
    return (
        <Tag.Root onClick={onRemove} cursor="pointer" colorPalette="orange">
            <Tag.StartElement>{icon}</Tag.StartElement>
            <Tag.Label>{label}</Tag.Label>
            <Tag.EndElement>
                <LuX />
            </Tag.EndElement>
        </Tag.Root>
    );
}

export default FilterItem;
