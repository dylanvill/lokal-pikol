import { useMemo } from 'react';
import { LuCheckCheck, LuHouse, LuSun } from 'react-icons/lu';
import militaryTimeToAmPmTime from '../../../../shared/helpers/militaryTimeToAmPmTime';
import type FacilityCourtType from '../../../models/FacilityCourtType';
import type SocialLink from '../../../models/SocialLink';

export default function useListingDisplay(
    openingTime: string | null,
    closingTime: string | null,
    courtType: FacilityCourtType,
    socialLinks: SocialLink[],
) {
    const businessHoursDisplay = useMemo((): string | null => {
        if (openingTime && closingTime) {
            return `${militaryTimeToAmPmTime(openingTime)} - ${militaryTimeToAmPmTime(closingTime)}`;
        }
        return null;
    }, [openingTime, closingTime]);

    const typeIcon = useMemo((): React.ReactNode => {
        if (courtType === 'Covered') return LuHouse({ color: 'black' });
        if (courtType === 'Outdoor') return LuSun({ color: 'black' });
        return LuCheckCheck({ color: 'gray' });
    }, [courtType]);

    const facebookLink = socialLinks?.find((link) => link.platform.toLowerCase() === 'facebook');
    const instagramLink = socialLinks?.find((link) => link.platform.toLowerCase() === 'instagram');

    return { businessHoursDisplay, typeIcon, facebookLink, instagramLink };
}
