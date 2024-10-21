/**
 *  @param id the id of the match
 *  @param teams an object of the form <code>{ home, away }</code> containing the home and away teams of the match
 *  @param timestamp the timestamp of the kickoff time of the game
 *  @param status the current status of the game
 *  @see MatchScoreTeamInterface
 */
export interface MatchScoreInterface {
    id: number
    teams: {
        home: MatchScoreTeamInterface;
        away: MatchScoreTeamInterface;
    }
    timestamp: number;
    status: string;
}

export interface MatchScoreTeamInterface {
    id: number;
    name: string;
    logo: string;
    winner: boolean | null;
    goals: number | null;
}