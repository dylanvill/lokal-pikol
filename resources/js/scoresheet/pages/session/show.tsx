import { Badge, Heading, Text, VStack } from '@chakra-ui/react';
import { type PageProps } from '@inertiajs/core';
import { usePage } from '@inertiajs/react';
import GamesSection from '../../components/GamesSection';
import SubmitWizard from '../../components/SubmitWizard';
import ScoresheetLayout from '../../layouts/ScoresheetLayout';
import type Session from '../../models/Session';

interface SessionShowPageProps extends PageProps {
    session: Session;
}

function SessionShowPage() {
    const { session } = usePage<SessionShowPageProps>().props;
    const isActive = session.status === 'active';

    return (
        <ScoresheetLayout title={session.name}>
            <VStack align="stretch" gap={4}>
                <VStack alignItems="flex-start">
                    <Heading>{session.name} asdfsadf asf sdaf dsaf sdfsafsdaf a</Heading>
                    <Badge colorPalette={isActive ? 'green' : 'orange'} variant="solid" size="md">
                        {isActive ? 'Active' : 'Ended'}
                    </Badge>
                </VStack>
                {!isActive && (
                    <Text color="gray.500" fontSize="sm">
                        This session has ended. Results are still viewable below:
                    </Text>
                )}
                <GamesSection games={session.games} />

                {isActive && <SubmitWizard session={session} />}
            </VStack>
        </ScoresheetLayout>
    );
}

export default SessionShowPage;
