import { Card, Heading, VStack } from '@chakra-ui/react';
import { LuBuilding, LuClock, LuMail, LuMapPin, LuPhone } from 'react-icons/lu';
import DetailWithIcon from '../shared/DetailWithIcon';

export interface FacilityReservationInfoCardProps {
    name: string;
    email: string;
    phone: string;
    city: string;
    address: string;
    operatingHours: string;
}

function FacilityReservationInfoCard({ name, email, phone, city, address, operatingHours }: FacilityReservationInfoCardProps) {
    return (
        <Card.Root>
            <Card.Header>
                <Card.Title>
                    <Heading>Having trouble?</Heading>
                </Card.Title>
                <Card.Description>You can contact the facility directly for assistance.</Card.Description>
            </Card.Header>
            <Card.Body>
                <Heading marginBottom={2} size="md">
                    {name}
                </Heading>
                <VStack alignItems="stretch" gap={1}>
                    <DetailWithIcon icon={<LuMail />} label={email} textProps={{ color: 'black' }} />
                    <DetailWithIcon icon={<LuPhone />} label={phone} textProps={{ color: 'black' }} />
                    <DetailWithIcon icon={<LuBuilding />} label={city} textProps={{ color: 'black' }} />
                    <DetailWithIcon icon={<LuMapPin />} label={address} textProps={{ color: 'black' }} />
                    <DetailWithIcon icon={<LuClock />} label={operatingHours} textProps={{ color: 'black' }} />
                </VStack>
            </Card.Body>
        </Card.Root>
    );
}

export default FacilityReservationInfoCard;
