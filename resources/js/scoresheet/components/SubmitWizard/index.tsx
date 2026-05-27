import { ActionBar, Button, CloseButton, Dialog, HStack, Portal, Steps } from '@chakra-ui/react';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { LuPlus } from 'react-icons/lu';
import type Player from '../../models/Player';
import type Session from '../../models/Session';
import ReviewStep from './steps/ReviewStep';
import SelectPairStep from './steps/SelectPairStep';
import SelectScoreStep from './steps/SelectScoreStep';

interface FormData {
    teamAPlayer1Id: string;
    teamAPlayer2Id: string;
    teamBPlayer1Id: string;
    teamBPlayer2Id: string;
    teamAScore: number | null;
    teamBScore: number | null;
}

interface Props {
    session: Session;
}

const STEP_COUNT = 5;

function SubmitWizard({ session }: Props) {
    const isActive = session.status === 'active';
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState(0);

    const form = useForm<FormData>({
        teamAPlayer1Id: '',
        teamAPlayer2Id: '',
        teamBPlayer1Id: '',
        teamBPlayer2Id: '',
        teamAScore: null,
        teamBScore: null,
    });

    const pairAIds = [form.data.teamAPlayer1Id, form.data.teamAPlayer2Id].filter(Boolean);
    const pairBIds = [form.data.teamBPlayer1Id, form.data.teamBPlayer2Id].filter(Boolean);

    const pairAPlayer1Name = session.players.find((p) => p.id === form.data.teamAPlayer1Id)?.name ?? '';
    const pairAPlayer2Name = session.players.find((p) => p.id === form.data.teamAPlayer2Id)?.name ?? '';
    const pairBPlayer1Name = session.players.find((p) => p.id === form.data.teamBPlayer1Id)?.name ?? '';
    const pairBPlayer2Name = session.players.find((p) => p.id === form.data.teamBPlayer2Id)?.name ?? '';

    function handleOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
        setStep(0);
        form.reset();
    }

    function handleTogglePairA(player: Player) {
        if (form.data.teamAPlayer1Id === player.id) {
            form.setData({ ...form.data, teamAPlayer1Id: form.data.teamAPlayer2Id, teamAPlayer2Id: '' });
        } else if (form.data.teamAPlayer2Id === player.id) {
            form.setData({ ...form.data, teamAPlayer2Id: '' });
        } else if (pairAIds.length < 2) {
            if (!form.data.teamAPlayer1Id) {
                form.setData({ ...form.data, teamAPlayer1Id: player.id });
            } else {
                form.setData({ ...form.data, teamAPlayer2Id: player.id });
            }
        }
    }

    function handleTogglePairB(player: Player) {
        if (form.data.teamBPlayer1Id === player.id) {
            form.setData({ ...form.data, teamBPlayer1Id: form.data.teamBPlayer2Id, teamBPlayer2Id: '' });
        } else if (form.data.teamBPlayer2Id === player.id) {
            form.setData({ ...form.data, teamBPlayer2Id: '' });
        } else if (pairBIds.length < 2) {
            if (!form.data.teamBPlayer1Id) {
                form.setData({ ...form.data, teamBPlayer1Id: player.id });
            } else {
                form.setData({ ...form.data, teamBPlayer2Id: player.id });
            }
        }
    }

    function goBack() {
        if (step === 1) {
            form.setData({ ...form.data, teamBPlayer1Id: '', teamBPlayer2Id: '' });
        }
        setStep(step - 1);
    }

    function goForward() {
        setStep(step + 1);
    }

    function handleSubmit() {
        form.post(`/session/${session.sessionCode}/matches`, {
            onSuccess: handleClose,
        });
    }

    const canContinue =
        step === 0
            ? pairAIds.length === 2
            : step === 1
              ? pairBIds.length === 2
              : step === 2
                ? form.data.teamAScore !== null
                : step === 3
                  ? form.data.teamBScore !== null
                  : true;

    return (
        <>
            <ActionBar.Root open={isActive}>
                <Portal>
                    <ActionBar.Positioner>
                        <ActionBar.Content>
                            <Button colorPalette="blue" size="sm" onClick={handleOpen}>
                                <LuPlus />
                                Add Match
                            </Button>
                        </ActionBar.Content>
                    </ActionBar.Positioner>
                </Portal>
            </ActionBar.Root>

            <Dialog.Root
                open={open}
                onOpenChange={(e) => {
                    if (!e.open) handleClose();
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

                            <Steps.Root step={step} count={STEP_COUNT} size="xs" linear px={6} pb={3}>
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
                                {step === 0 && (
                                    <SelectPairStep
                                        players={session.players}
                                        selectedIds={pairAIds}
                                        excludeIds={[]}
                                        onToggle={handleTogglePairA}
                                    />
                                )}
                                {step === 1 && (
                                    <SelectPairStep
                                        players={session.players}
                                        selectedIds={pairBIds}
                                        excludeIds={pairAIds}
                                        onToggle={handleTogglePairB}
                                    />
                                )}
                                {step === 2 && (
                                    <SelectScoreStep
                                        player1Name={pairAPlayer1Name}
                                        player2Name={pairAPlayer2Name}
                                        score={form.data.teamAScore}
                                        onSelect={(score) => form.setData('teamAScore', score)}
                                    />
                                )}
                                {step === 3 && (
                                    <SelectScoreStep
                                        player1Name={pairBPlayer1Name}
                                        player2Name={pairBPlayer2Name}
                                        score={form.data.teamBScore}
                                        onSelect={(score) => form.setData('teamBScore', score)}
                                    />
                                )}
                                {step === 4 && (
                                    <ReviewStep
                                        pairA={{
                                            player1Name: pairAPlayer1Name,
                                            player2Name: pairAPlayer2Name,
                                            score: form.data.teamAScore ?? 0,
                                        }}
                                        pairB={{
                                            player1Name: pairBPlayer1Name,
                                            player2Name: pairBPlayer2Name,
                                            score: form.data.teamBScore ?? 0,
                                        }}
                                        errors={form.errors}
                                    />
                                )}
                            </Dialog.Body>

                            <Dialog.Footer>
                                <HStack justify="space-between" w="full">
                                    {step > 0 ? (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={goBack}
                                            disabled={form.processing}
                                        >
                                            Back
                                        </Button>
                                    ) : (
                                        <span />
                                    )}
                                    {step < STEP_COUNT - 1 ? (
                                        <Button
                                            colorPalette="blue"
                                            size="sm"
                                            onClick={goForward}
                                            disabled={!canContinue}
                                        >
                                            Continue
                                        </Button>
                                    ) : (
                                        <Button
                                            colorPalette="blue"
                                            size="sm"
                                            onClick={handleSubmit}
                                            loading={form.processing}
                                        >
                                            Submit
                                        </Button>
                                    )}
                                </HStack>
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
