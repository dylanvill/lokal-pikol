import { Badge, Heading, Image, VStack } from '@chakra-ui/react';
import { LuMail, LuMapPin, LuPhone } from 'react-icons/lu';
import DetailWithIcon from '../../shared/DetailWithIcon';

export interface FacilityHeaderProps {
    name: string;
    address: string;
    city: string;
    email: string;
    phone: string;
    profilePhotoUrl: string;
}

function FacilityHeader({ name, address, city, email, phone, profilePhotoUrl }: FacilityHeaderProps) {
    return (
        <VStack justifyItems="center" alignItems="center" gap={0}>
            <Image
                src={profilePhotoUrl}
                alt={name}
                w="36"
                h="36"
                objectFit="cover"
                borderRadius="md"
                border="2px solid white"
                shadow="xs"
                marginBottom={4}
            />
            <Heading size="xl" textAlign="center">
                {name}
            </Heading>
            <Badge colorPalette="blue" fontSize="sm" marginBottom={4}>
                {city}
            </Badge>
            <DetailWithIcon icon={<LuMapPin color="gray" />} label={address} textProps={{ textAlign: 'center' }} />
            <DetailWithIcon icon={<LuMail color="gray" />} label={email} textProps={{ textAlign: 'center' }} />
            <DetailWithIcon icon={<LuPhone color="gray" />} label={phone} textProps={{ textAlign: 'center' }} />
        </VStack>
    );
}

export default FacilityHeader;
