import type Game from './Game';
import type Player from './Player';

interface Session {
    sessionCode: string;
    name: string;
    status: 'active' | 'finished';
    players: Player[];
    games: Game[];
}

export default Session;
