import { Box, Button, HStack, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import type Player from '../models/Player';
import type Session from '../models/Session';

type WizardStep = 'selectTeamA' | 'selectTeamB' | 'scoreTeamA' | 'scoreTeamB' | 'review';

const STEPS: WizardStep[] = ['selectTeamA', 'selectTeamB', 'scoreTeamA', 'scoreTeamB', 'review'];

const STEP_TITLES: Record<WizardStep, string> = {
    selectTeamA: 'Select Team A',
    selectTeamB: 'Select Team B',
    scoreTeamA: 'Team A Score',
    scoreTeamB: 'Team B Score',
    review: 'Review',
};

const SCORES = Array.from({ length: 12 }, (_, i) => i);

function teamLabel(players: Player[]): string {
    return players.map((p) => p.name).join(' & ');
}

interface Props {
    session: Session;
}

function SubmitWizard({ session }: Props) {
    const [step, setStep] = useState<WizardStep>('selectTeamA');

    const form = useForm<{
        teamAPlayer1Id: string;
        teamAPlayer2Id: string;
        teamBPlayer1Id: string;
        teamBPlayer2Id: string;
        teamAScore: number | null;
        teamBScore: number | null;
    }>({
        teamAPlayer1Id: '',
        teamAPlayer2Id: '',
        teamBPlayer1Id: '',
        teamBPlayer2Id: '',
        teamAScore: null,
        teamBScore: null,
    });

    const stepIndex = STEPS.indexOf(step);

    const teamAIds = [form.data.teamAPlayer1Id, form.data.teamAPlayer2Id].filter(Boolean);
    const teamBIds = [form.data.teamBPlayer1Id, form.data.teamBPlayer2Id].filter(Boolean);
    const teamAPlayers = session.players.filter((p) => teamAIds.includes(p.id));
    const teamBPlayers = session.players.filter((p) => teamBIds.includes(p.id));

    function toggleTeamA(player: Player) {
        if (form.data.teamAPlayer1Id === player.id) {
            form.setData('teamAPlayer1Id', '');
        } else if (form.data.teamAPlayer2Id === player.id) {
            form.setData('teamAPlayer2Id', '');
        } else if (!form.data.teamAPlayer1Id) {
            form.setData('teamAPlayer1Id', player.id);
        } else if (!form.data.teamAPlayer2Id) {
            form.setData('teamAPlayer2Id', player.id);
        }
    }

    function toggleTeamB(player: Player) {
        if (form.data.teamBPlayer1Id === player.id) {
            form.setData('teamBPlayer1Id', '');
        } else if (form.data.teamBPlayer2Id === player.id) {
            form.setData('teamBPlayer2Id', '');
        } else if (!form.data.teamBPlayer1Id) {
            form.setData('teamBPlayer1Id', player.id);
        } else if (!form.data.teamBPlayer2Id) {
            form.setData('teamBPlayer2Id', player.id);
        }
    }

    function goBack() {
        const prev = STEPS[stepIndex - 1];
        if (prev === 'selectTeamA') {
            form.setData({ ...form.data, teamBPlayer1Id: '', teamBPlayer2Id: '' });
        }
        setStep(prev);
    }

    function goNext() {
        setStep(STEPS[stepIndex + 1]);
    }

    function handleSubmit() {
        form.post(`/session/${session.sessionCode}/matches`, {
            onSuccess: () => {
                form.reset();
                setStep('selectTeamA');
            },
        });
    }

    return (
        <Box bg="white" borderWidth="1px" borderColor="gray.200" borderRadius="lg" overflow="hidden">
            <HStack justify="space-between" px={4} py={3} borderBottomWidth="1px" borderColor="gray.100">
                <HStack gap={2}>
                    {stepIndex > 0 && (
                        <Button variant="ghost" size="sm" px={1} onClick={goBack}>
                            ← Back
                        </Button>
                    )}
                    <Heading size="sm">{STEP_TITLES[step]}</Heading>
                </HStack>
                <Text fontSize="xs" color="gray.400">
                    {stepIndex + 1} / {STEPS.length}
                </Text>
            </HStack>

            <Box px={4} py={4}>
                {step === 'selectTeamA' && (
                    <VStack align="stretch" gap={4}>
                        <Text fontSize="sm" color="gray.500">
                            Select 2 players for Team A.
                        </Text>
                        <SimpleGrid columns={2} gap={2}>
                            {session.players.map((player) => {
                                const selected = teamAIds.includes(player.id);
                                const full = teamAIds.length === 2 && !selected;
                                return (
                                    <Button
                                        key={player.id}
                                        variant={selected ? 'solid' : 'outline'}
                                        colorPalette={selected ? 'blue' : 'gray'}
                                        onClick={() => toggleTeamA(player)}
                                        disabled={full}
                                        size="lg"
                                        h="auto"
                                        py={3}
                                        whiteSpace="normal"
                                        textAlign="center"
                                    >
                                        {player.name}
                                    </Button>
                                );
                            })}
                        </SimpleGrid>
                        <Button colorPalette="blue" disabled={teamAIds.length !== 2} onClick={goNext}>
                            Continue
                        </Button>
                    </VStack>
                )}

                {step === 'selectTeamB' && (
                    <VStack align="stretch" gap={4}>
                        <HStack justify="space-between" align="flex-start">
                            <Text fontSize="sm" color="gray.500">
                                Select 2 players for Team B.
                            </Text>
                            <Text fontSize="sm" color="blue.600" fontWeight="medium" textAlign="right" flexShrink={0}>
                                A: {teamLabel(teamAPlayers)}
                            </Text>
                        </HStack>
                        <SimpleGrid columns={2} gap={2}>
                            {session.players.map((player) => {
                                const isTeamA = teamAIds.includes(player.id);
                                const selected = teamBIds.includes(player.id);
                                const full = teamBIds.length === 2 && !selected;
                                return (
                                    <Button
                                        key={player.id}
                                        variant={selected ? 'solid' : 'outline'}
                                        colorPalette={selected ? 'blue' : 'gray'}
                                        onClick={() => !isTeamA && toggleTeamB(player)}
                                        disabled={isTeamA || full}
                                        size="lg"
                                        h="auto"
                                        py={3}
                                        whiteSpace="normal"
                                        textAlign="center"
                                        opacity={isTeamA ? 0.35 : 1}
                                    >
                                        {player.name}
                                    </Button>
                                );
                            })}
                        </SimpleGrid>
                        <Button colorPalette="blue" disabled={teamBIds.length !== 2} onClick={goNext}>
                            Continue
                        </Button>
                    </VStack>
                )}

                {step === 'scoreTeamA' && (
                    <VStack align="stretch" gap={4}>
                        <Text fontSize="sm" color="gray.500">
                            {teamLabel(teamAPlayers)}
                        </Text>
                        <SimpleGrid columns={3} gap={2}>
                            {SCORES.map((score) => (
                                <Button
                                    key={score}
                                    variant={form.data.teamAScore === score ? 'solid' : 'outline'}
                                    colorPalette={form.data.teamAScore === score ? 'blue' : 'gray'}
                                    onClick={() => form.setData('teamAScore', score)}
                                    size="lg"
                                    fontSize="xl"
                                    fontWeight="bold"
                                >
                                    {score}
                                </Button>
                            ))}
                        </SimpleGrid>
                        <Button colorPalette="blue" disabled={form.data.teamAScore === null} onClick={goNext}>
                            Continue
                        </Button>
                    </VStack>
                )}

                {step === 'scoreTeamB' && (
                    <VStack align="stretch" gap={4}>
                        <Text fontSize="sm" color="gray.500">
                            {teamLabel(teamBPlayers)}
                        </Text>
                        <SimpleGrid columns={3} gap={2}>
                            {SCORES.map((score) => (
                                <Button
                                    key={score}
                                    variant={form.data.teamBScore === score ? 'solid' : 'outline'}
                                    colorPalette={form.data.teamBScore === score ? 'blue' : 'gray'}
                                    onClick={() => form.setData('teamBScore', score)}
                                    size="lg"
                                    fontSize="xl"
                                    fontWeight="bold"
                                >
                                    {score}
                                </Button>
                            ))}
                        </SimpleGrid>
                        <Button colorPalette="blue" disabled={form.data.teamBScore === null} onClick={goNext}>
                            Continue
                        </Button>
                    </VStack>
                )}

                {step === 'review' && (
                    <VStack align="stretch" gap={4}>
                        <Box borderWidth="1px" borderColor="gray.100" borderRadius="md" p={4}>
                            <VStack align="stretch" gap={4}>
                                <HStack justify="space-between" align="flex-start">
                                    <VStack align="flex-start" gap={0}>
                                        <Text fontSize="xs" color="gray.400" fontWeight="semibold" letterSpacing="wide">
                                            TEAM A
                                        </Text>
                                        {teamAPlayers.map((p) => (
                                            <Text key={p.id} fontWeight="semibold">
                                                {p.name}
                                            </Text>
                                        ))}
                                    </VStack>
                                    <Text fontWeight="bold" fontSize="5xl" lineHeight="1" color="gray.800">
                                        {form.data.teamAScore}
                                    </Text>
                                </HStack>

                                <Box h="1px" bg="gray.100" />

                                <HStack justify="space-between" align="flex-start">
                                    <VStack align="flex-start" gap={0}>
                                        <Text fontSize="xs" color="gray.400" fontWeight="semibold" letterSpacing="wide">
                                            TEAM B
                                        </Text>
                                        {teamBPlayers.map((p) => (
                                            <Text key={p.id} fontWeight="semibold">
                                                {p.name}
                                            </Text>
                                        ))}
                                    </VStack>
                                    <Text fontWeight="bold" fontSize="5xl" lineHeight="1" color="gray.800">
                                        {form.data.teamBScore}
                                    </Text>
                                </HStack>
                            </VStack>
                        </Box>

                        {(form.errors as Record<string, string | undefined>).players && (
                            <Text color="red.500" fontSize="sm">
                                {(form.errors as Record<string, string | undefined>).players}
                            </Text>
                        )}

                        <Button colorPalette="blue" loading={form.processing} onClick={handleSubmit}>
                            Submit
                        </Button>
                    </VStack>
                )}
            </Box>
        </Box>
    );
}

export default SubmitWizard;
