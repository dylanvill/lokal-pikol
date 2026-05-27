import { ActionBar, Button, CloseButton, Dialog, Portal, Steps } from '@chakra-ui/react';
import { LuPlus } from 'react-icons/lu';
import type Session from '../../models/Session';
import useMatchWizard, { STEP_COUNT } from './useMatchWizard';
import WizardBody from './WizardBody';
import WizardFooter from './WizardFooter';

interface Props {
    session: Session;
}

function SubmitWizard({ session }: Props) {
    const isActive = session.status === 'active';
    const wizard = useMatchWizard(session);

    return (
        <>
            <ActionBar.Root open={isActive}>
                <Portal>
                    <ActionBar.Positioner>
                        <ActionBar.Content>
                            <Button colorPalette="blue" size="sm" onClick={wizard.openWizard}>
                                <LuPlus />
                                Add Match
                            </Button>
                        </ActionBar.Content>
                    </ActionBar.Positioner>
                </Portal>
            </ActionBar.Root>

            <Dialog.Root
                open={wizard.open}
                onOpenChange={(e) => {
                    if (!e.open) wizard.closeWizard();
                }}
                size={{ mdDown: 'full', md: 'md' }}
                motionPreset="slide-in-bottom"
                lazyMount
            >
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header>
                                <Dialog.Title>Add Match</Dialog.Title>
                            </Dialog.Header>

                            <Steps.Root step={wizard.step} count={STEP_COUNT} size="xs" linear px={6} pb={3}>
                                <Steps.List>
                                    {Array.from({ length: STEP_COUNT }, (_, i) => (
                                        <Steps.Item key={i} index={i}>
                                            <Steps.Indicator />
                                            <Steps.Separator />
                                        </Steps.Item>
                                    ))}
                                </Steps.List>
                            </Steps.Root>

                            <Dialog.Body>
                                <WizardBody session={session} wizard={wizard} />
                            </Dialog.Body>

                            <Dialog.Footer>
                                <WizardFooter wizard={wizard} />
                            </Dialog.Footer>

                            <Dialog.CloseTrigger asChild>
                                <CloseButton size="sm" />
                            </Dialog.CloseTrigger>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </>
    );
}

export default SubmitWizard;
