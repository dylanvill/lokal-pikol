import type Session from '../../models/Session';
import ReviewStep from './steps/ReviewStep';
import SelectPairStep from './steps/SelectPairStep';
import SelectScoreStep from './steps/SelectScoreStep';
import type { MatchWizard } from './useMatchWizard';

interface Props {
    session: Session;
    wizard: MatchWizard;
}

function WizardBody({ session, wizard }: Props) {
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
                <SelectScoreStep
                    player1Name={wizard.pairAPlayer1Name}
                    player2Name={wizard.pairAPlayer2Name}
                    score={wizard.form.data.teamAScore}
                    onSelect={(score) => wizard.setScore('A', score)}
                />
            );
        case 3:
            return (
                <SelectScoreStep
                    player1Name={wizard.pairBPlayer1Name}
                    player2Name={wizard.pairBPlayer2Name}
                    score={wizard.form.data.teamBScore}
                    onSelect={(score) => wizard.setScore('B', score)}
                />
            );
        case 4:
            return (
                <ReviewStep
                    pairA={{
                        player1Name: wizard.pairAPlayer1Name,
                        player2Name: wizard.pairAPlayer2Name,
                        score: wizard.form.data.teamAScore ?? 0,
                    }}
                    pairB={{
                        player1Name: wizard.pairBPlayer1Name,
                        player2Name: wizard.pairBPlayer2Name,
                        score: wizard.form.data.teamBScore ?? 0,
                    }}
                    errors={wizard.form.errors}
                />
            );
        default:
            return null;
    }
}

export default WizardBody;
