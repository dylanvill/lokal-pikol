import type Session from '../../models/Session';
import ReviewStep from './steps/ReviewStep';
import SelectLoserStep from './steps/SelectLoserStep';
import SelectPairStep from './steps/SelectPairStep';
import SelectScoreStep from './steps/SelectScoreStep';
import { WINNER_SCORE, type MatchWizard } from './useMatchWizard';

interface Props {
    session: Session;
    wizard: MatchWizard;
}

function WizardBody({ session, wizard }: Props) {
    const pairA = {
        player1Name: wizard.pairAPlayer1Name,
        player2Name: wizard.pairAPlayer2Name,
    };
    const pairB = {
        player1Name: wizard.pairBPlayer1Name,
        player2Name: wizard.pairBPlayer2Name,
    };

    switch (wizard.step) {
        case 0:
            return (
                <SelectPairStep
                    players={session.players}
                    selectedIds={wizard.pairAIds}
                    excludeIds={[]}
                    onToggle={(player) => wizard.togglePair('A', player)}
                />
            );
        case 1:
            return (
                <SelectPairStep
                    players={session.players}
                    selectedIds={wizard.pairBIds}
                    excludeIds={wizard.pairAIds}
                    onToggle={(player) => wizard.togglePair('B', player)}
                />
            );
        case 2:
            return (
                <SelectLoserStep
                    pairA={pairA}
                    pairB={pairB}
                    selected={wizard.form.data.loserTeam}
                    onSelect={wizard.setLoser}
                />
            );
        case 3: {
            const loserPair = wizard.form.data.loserTeam === 'A' ? pairA : pairB;
            return (
                <SelectScoreStep
                    player1Name={loserPair.player1Name}
                    player2Name={loserPair.player2Name}
                    score={wizard.form.data.loserScore}
                    onSelect={wizard.setLoserScore}
                />
            );
        }
        case 4: {
            const loserScore = wizard.form.data.loserScore ?? 0;
            const teamAScore = wizard.form.data.loserTeam === 'A' ? loserScore : WINNER_SCORE;
            const teamBScore = wizard.form.data.loserTeam === 'B' ? loserScore : WINNER_SCORE;
            return (
                <ReviewStep
                    pairA={{ ...pairA, score: teamAScore }}
                    pairB={{ ...pairB, score: teamBScore }}
                    errors={wizard.form.errors}
                />
            );
        }
        default:
            return null;
    }
}

export default WizardBody;
