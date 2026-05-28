import type Game from './Game';
import type LeaderboardItem from './LeaderboardItem';
import type Player from './Player';

interface Session {
    sessionCode: string;
    name: string;
    status: 'active' | 'finished';
    players: Player[];
    games: Game[];
    leaderboard: LeaderboardItem[];
}

export default Session;
