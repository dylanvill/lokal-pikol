import { useForm, type InertiaFormProps } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import type Player from '../../models/Player';
import type Session from '../../models/Session';
import { toaster } from '../../shared/toaster';

export type Team = 'A' | 'B';

export interface MatchFormData {
    teamAPlayer1Id: string;
    teamAPlayer2Id: string;
    teamBPlayer1Id: string;
    teamBPlayer2Id: string;
    loserTeam: Team | null;
    loserScore: number | null;
}

export const STEP_COUNT = 5;
export const WINNER_SCORE = 11;

export interface MatchWizard {
    open: boolean;
    step: number;
    form: InertiaFormProps<MatchFormData>;
    pairAIds: string[];
    pairBIds: string[];
    pairAPlayer1Name: string;
    pairAPlayer2Name: string;
    pairBPlayer1Name: string;
    pairBPlayer2Name: string;
    canContinue: boolean;
    isLastStep: boolean;
    openWizard: () => void;
    closeWizard: () => void;
    goBack: () => void;
    goForward: () => void;
    togglePair: (team: Team, player: Player) => void;
    setLoser: (team: Team) => void;
    setLoserScore: (score: number) => void;
    submit: () => void;
}

const TEAM_FIELDS: Record<Team, { player1: keyof MatchFormData; player2: keyof MatchFormData }> = {
    A: { player1: 'teamAPlayer1Id', player2: 'teamAPlayer2Id' },
    B: { player1: 'teamBPlayer1Id', player2: 'teamBPlayer2Id' },
};

function useMatchWizard(session: Session): MatchWizard {
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState(0);

    const form = useForm<MatchFormData>({
        teamAPlayer1Id: '',
        teamAPlayer2Id: '',
        teamBPlayer1Id: '',
        teamBPlayer2Id: '',
        loserTeam: null,
        loserScore: null,
    });

    const playersById = useMemo(
        () => new Map(session.players.map((p) => [p.id, p])),
        [session.players],
    );

    const nameOf = (id: string) => playersById.get(id)?.name ?? '';

    const pairAIds = [form.data.teamAPlayer1Id, form.data.teamAPlayer2Id].filter(Boolean);
    const pairBIds = [form.data.teamBPlayer1Id, form.data.teamBPlayer2Id].filter(Boolean);

    function openWizard() {
        setOpen(true);
    }

    function closeWizard() {
        setOpen(false);
        setStep(0);
        form.reset();
    }

    function togglePair(team: Team, player: Player) {
        const fields = TEAM_FIELDS[team];
        const player1Id = form.data[fields.player1] as string;
        const player2Id = form.data[fields.player2] as string;

        if (player1Id === player.id) {
            form.setData(fields.player1, player2Id);
            form.setData(fields.player2, '');
            return;
        }
        if (player2Id === player.id) {
            form.setData(fields.player2, '');
            return;
        }
        if (!player1Id) {
            form.setData(fields.player1, player.id);
        } else if (!player2Id) {
            form.setData(fields.player2, player.id);
        }
    }

    function setLoser(team: Team) {
        form.setData('loserTeam', team);
    }

    function setLoserScore(score: number) {
        form.setData('loserScore', score);
    }

    function goBack() {
        if (step === 1) {
            form.setData('teamBPlayer1Id', '');
            form.setData('teamBPlayer2Id', '');
        } else if (step === 2) {
            form.setData('loserTeam', null);
        } else if (step === 3) {
            form.setData('loserScore', null);
        }
        setStep((s) => s - 1);
    }

    function goForward() {
        setStep((s) => s + 1);
    }

    function submit() {
        form.transform((data) => {
            const loserScore = data.loserScore ?? 0;
            return {
                teamAPlayer1Id: data.teamAPlayer1Id,
                teamAPlayer2Id: data.teamAPlayer2Id,
                teamBPlayer1Id: data.teamBPlayer1Id,
                teamBPlayer2Id: data.teamBPlayer2Id,
                teamAScore: data.loserTeam === 'A' ? loserScore : WINNER_SCORE,
                teamBScore: data.loserTeam === 'B' ? loserScore : WINNER_SCORE,
            };
        });
        form.post(`/session/${session.sessionCode}/matches`, {
            onSuccess: () => {
                closeWizard();
                toaster.success({ title: 'Match recorded', duration: 4000 });
            },
        });
    }

    const canContinueByStep: Record<number, boolean> = {
        0: pairAIds.length === 2,
        1: pairBIds.length === 2,
        2: form.data.loserTeam !== null,
        3: form.data.loserScore !== null,
        4: true,
    };

    return {
        open,
        step,
        form,
        pairAIds,
        pairBIds,
        pairAPlayer1Name: nameOf(form.data.teamAPlayer1Id),
        pairAPlayer2Name: nameOf(form.data.teamAPlayer2Id),
        pairBPlayer1Name: nameOf(form.data.teamBPlayer1Id),
        pairBPlayer2Name: nameOf(form.data.teamBPlayer2Id),
        canContinue: canContinueByStep[step] ?? false,
        isLastStep: step === STEP_COUNT - 1,
        openWizard,
        closeWizard,
        goBack,
        goForward,
        togglePair,
        setLoser,
        setLoserScore,
        submit,
    };
}

export default useMatchWizard;
