import { Flex, HStack, Text } from '@chakra-ui/react';
import { useMemo } from 'react';
import { LuGrid2X2, LuMapPin } from 'react-icons/lu';
import type ListingFilters from '../../../models/directory/ListingFilters';
import { listingItemCourtTypeIconParser } from '../../helpers/listingItemCourtTypeIconParser';
import FilterItem from './FilterItem';

export interface ActiveFiltersProps extends ListingFilters {
    onRemoveFilter: (filterKey: keyof ListingFilters) => void;
}

function ActiveFilters({ city, courtType, numberOfCourts, onRemoveFilter }: ActiveFiltersProps) {
    const CourtTypeIcon = useMemo(() => listingItemCourtTypeIconParser(courtType!), [courtType]);

    const numberOfCourtsLabel = useMemo(() => {
        if (!numberOfCourts) return '';
        return numberOfCourts === 1 ? '1 court' : `${numberOfCourts} courts`;
    }, [numberOfCourts]);

    return (
        <Flex
            flexDirection={{
                base: 'column',
                md: 'row',
            }}
            gap={2}
        >
            <Text fontSize="sm" color="gray.600">
                Applied filters:
            </Text>
            <HStack marginBottom={4}>
                {city && <FilterItem icon={<LuMapPin />} label={city} onRemove={() => onRemoveFilter('city')} />}
                {courtType && <FilterItem icon={<CourtTypeIcon />} label={courtType} onRemove={() => onRemoveFilter('courtType')} />}
                {numberOfCourts && <FilterItem icon={<LuGrid2X2 />} label={numberOfCourtsLabel} onRemove={() => onRemoveFilter('numberOfCourts')} />}
            </HStack>
        </Flex>
    );
}

export default ActiveFilters;
