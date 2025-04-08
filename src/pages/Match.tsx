import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { fetchFixturesByID } from '../functions/APIData';
// import fixture from '../assets/data/sample/fixture.json'
import Lineups from '../components/Match/Lineups';
import MatchInfo from '../components/Match/MatchInfo';
import { MatchInfoInterface } from '../types';


const Match = () => {
    const { id } = useParams();
    // const data = {
    //     'fixture': fixture.response[0].fixture,
    //     'league': fixture.response[0].league,
    //     'teams': fixture.response[0].teams,
    //     'goals': fixture.response[0].goals,
    //     'score': fixture.response[0].score,
    //     'events': fixture.response[0].events,
    //     'lineups': fixture.response[0].lineups,
    //     'statistics': fixture.response[0].statistics,
    //     'players': fixture.response[0].players
    // }

    const parsedId = parseInt(id || '', 10);

    interface FixtureData {
        fixture: any,
        league: any,
        teams: any,
        goals: any,
        score: any,
        events: any,
        lineups: any,
        statistics: any,
        players: any
    }

    const { data, error, isLoading } = useQuery<FixtureData, Error>({
        queryKey: ['matchData', parsedId],
        queryFn: async () => {
            const [fixture] = await Promise.all([
                fetchFixturesByID(parsedId) as any
            ]);

            if (fixture?.errors?.plan) throw new Error(fixture.errors.plan);

            console.log(fixture.response[0]);
            return {
                fixture: fixture.response[0].fixture,
                league: fixture.response[0].league,
                teams: fixture.response[0].teams,
                goals: fixture.response[0].goals,
                score: fixture.response[0].score,
                events: fixture.response[0].events,
                lineups: fixture.response[0].lineups,
                statistics: fixture.response[0].statistics,
                players: fixture.response[0].players
            };
        },
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: 2,
        select: (data) => ({
            fixture: data.fixture,
            league: data.league,
            teams: data.teams,
            goals: data.goals,
            score: data.score,
            events: data.events,
            lineups: data.lineups,
            statistics: data.statistics,
            players: data.players
        }),
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;
    const match_date = new Date(data?.fixture.date);
    const match_info: MatchInfoInterface = {
        'home': {
            'logo': data?.teams?.home?.logo,
            'name': data?.teams?.home?.name,
            'goals': data?.goals?.home
        },
        'away': {
            'logo': data?.teams?.away?.logo,
            'name': data?.teams?.away.name,
            'goals': data?.goals?.away
        },
        'status': data?.fixture.status.long,
        'date': match_date.toLocaleDateString(),
        'location': `${data?.fixture.venue.name}, ${data?.fixture.venue.city}`,
        'referee': data?.fixture.referee.substring(0, data?.fixture.referee.indexOf(','))
    }

    console.log(data);
    return (
        <main>
            {/* <h1>{`Match ${id}`}</h1> */}
            <MatchInfo
                home = {match_info.home}
                away = {match_info.away}
                status = {match_info.status}
                date = {match_info.date}
                location = {match_info.location}
                referee = {match_info.referee}
            />
            {<Lineups
                lineups = {data?.lineups}
                players = {data?.players}
            />}
        </main>
    );
};

export default Match;