import { ChangeEventHandler, MouseEventHandler } from "react";

/**
 *  @param id the id of the match
 *  @param teams an object of the form <code>{ home, away }</code> containing the home and away teams of the match
 *  @param timestamp the timestamp of the kickoff time of the game
 *  @param status the current status of the game
 *  @see MatchScoreTeamInterface
 */
export interface MatchScoreInterface {
    id: number;
    teams: {
        home: MatchScoreTeamInterface;
        away: MatchScoreTeamInterface;
    }
    timestamp: number;
    status: {
        short: string;
        full: string;
    }
}

export interface MatchScoreTeamInterface {
    id: number;
    name: string;
    logo: string;
    winner: boolean | null;
    goals: number | null;
}

export interface LeagueScoresInterface {
    matches: any[] | undefined;
    id: number;
    collapsed: boolean;
    active: boolean;
    toggle_collapsed: MouseEventHandler<HTMLButtonElement>;
}

export interface DateSelectorInterface {
    date: Date;
    handleClick: MouseEventHandler<HTMLButtonElement>;
}

export interface FiltersInterface {
    date_selector: DateSelectorInterface;
    league_info: Map<number, { collapsed: boolean, active: boolean, matches: any[] }>;
    handleOnChange: ChangeEventHandler<HTMLInputElement>;
    collapsed: boolean;
    toggle_collapsed: MouseEventHandler<HTMLButtonElement>;
}

// interface PlayerInterface {
//     grid: string;
//     id: number;
//     name: string;
//     number: number;
//     pos: string;
// }

export type Lineup =
    {
        coach: {
            id: number;
            name: string;
            photo: string;
        };
        formation: string;
        startXI: any[];
        substitutes: any[];
        team: {
            colors: {
                goalkeeper: TeamColorsInterface;
                player: TeamColorsInterface;
            };
            id: number;
            logo: string;
            name: string;
        };
    }

export interface TeamColorsInterface {
    primary: string;
    number: string;
    border: string;
}

export interface LineupInterface {
    lineup: Lineup;
    home?: boolean;
    players: any[];
}

export interface LineupsInterface {
    lineups: Lineup[];
    players: any;
}

export interface MatchInfoInterface {
    home: {
        logo: string,
        name: string,
        goals: number
    },
    away : {
        logo: string,
        name: string,
        goals: number
    },
    status: string;
    date: string;
    location: string;
    referee: string;
}

export interface ImageInterface {
    src: string;
    alt: string;
    className?: string;
    lazyLoad?: boolean;
    draggable?: boolean;
    maxRetries?: number;
    fallbackSrc?: string;
}