import React from 'react';
import ListingCardSkeletonLoader from './ListingCardSkeletonLoader';

function useSkeletons(count = 8) {
    return Array.from({ length: count }).map((_, index) => <ListingCardSkeletonLoader key={index} />);
}

export default useSkeletons;
