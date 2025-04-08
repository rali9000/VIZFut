import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
// import fixtures from '../assets/data/sample/fixtures.json'
import LeagueScores from '../components/Home/LeagueScores';
import { fetchFixturesByDate } from '../functions/APIData';
import { parseAsTimestamp, useQueryState } from 'nuqs'
import Filters from '../components/Home/Filters';

function Home() {
    const [matches, setMatches] = useState<any[]>(new Array());
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [triggerFetch, setTriggerFetch] = useState<boolean>(false);
    const [hasFetched, setHasFetched] = useState<boolean>(false);

    const [date, setDate] = useQueryState('d', parseAsTimestamp.withDefault(new Date()));

    useEffect(() => {
        if (hasFetched || !triggerFetch) return;

        const fetchMatches = async () => {
            try {
                const data = await fetchFixturesByDate(date);
                if ((data as any).errors.plan) setError((data as any).errors.plan);
                else setMatches((data as any).response);
                setHasFetched(true);
            } catch (err) {
                if (error === null) setError(`Failed to fetch matches on ${date.toLocaleDateString}.`);
            } finally {
                setLoading(false);
            }
        }

        fetchMatches();
    }, [triggerFetch, hasFetched, error]);

    const handleFetchClick = () => {
        if (!hasFetched) setTriggerFetch(true);
    }

    const incrementDate = (event: any) => {
        let desiredDate: Date = new Date();
        let id = event.target.id;
        if (id === "inc_btn") desiredDate.setDate(date.getDate() + 1);
        else if (id === "dec_btn") desiredDate.setDate(date.getDate() - 1);
        else desiredDate = new Date();
        setDate(desiredDate);
        setHasFetched(false);
        handleFetchClick();
    }

    const today = () => {
        setDate(new Date());
        setHasFetched(false);
        handleFetchClick();
    }

    // World Cup, Champion's League, English Premier League, La Liga, Serie A, Bundesliga, Ligue 1, Eredivisie
    let homeLeagueIds = [1, 2, 39, 140, 135, 78, 61, 88];
    const [homeLeagues, setHomeLeagues] = useState(new Map<number, { collapsed: boolean, active: boolean, matches: any[] }>());

    useEffect(() => {
        const initLeagues = new Map<number, { collapsed: boolean, active: boolean, matches: any[] }>();
        homeLeagueIds.forEach((id) => {
            const leagueMatches = matches?.filter((match: any) => match.league.id === id);
            initLeagues.set(id, { collapsed: false, active: leagueMatches.length > 0, matches: leagueMatches });
        });
        setHomeLeagues(initLeagues);
    }, [matches]);

    const toggleState = (id: number, state: string) => {
        if (id !== -1) {
            setHomeLeagues((prev) => {
                const updatedLeagues = new Map(prev);
                const league = updatedLeagues.get(id);
                if (league) {
                    if (state === "c") league.collapsed = !league.collapsed;
                    else if (state === "a") league.active = !league.active;
                    updatedLeagues.set(id, league);
                }
                return updatedLeagues;
            });
        }
    }

    const toggleCollapsed = (e: MouseEvent<HTMLElement>) => {
        const id = parseInt(e.currentTarget.id ?? '-1');
        toggleState(id, "c");
    }

    const toggleActive = (e: ChangeEvent<HTMLInputElement>) => {
        const id = parseInt(e.currentTarget.id ?? '-1');
        // e.currentTarget.checked = !e.currentTarget.checked;
        toggleState(id, "a");
    }

    const [filtersCollapsed, setFiltersCollapsed] = useState<boolean>(true);

    const toggleFilters = () => setFiltersCollapsed(!filtersCollapsed);

    if (loading) return <div>Loading...</div>;
    if (error) return (
        <div>{error}</div>
    );

    return (
        <>
            <h1>FutCentre</h1>
            <button onClick={today}>Fetch Today's Games</button>
            <div className="main_content_wrapper">
                <section className='leagues_wrapper'>
                    {homeLeagueIds.map((id: number) => (
                        <LeagueScores
                            matches={homeLeagues.get(id)?.matches}
                            collapsed={homeLeagues.get(id)?.collapsed ?? false}
                            toggle_collapsed={toggleCollapsed}
                            active={homeLeagues.get(id)?.active ?? false}
                            id={id}
                            key={`${id}`}
                        />
                    ))}
                </section>
                <div className="filters_wrapper">
                    <Filters
                        date_selector={{
                            date: date,
                            handleClick: incrementDate
                        }}
                        league_info={homeLeagues}
                        handleOnChange={toggleActive}
                        toggle_collapsed={toggleFilters}
                        collapsed={filtersCollapsed}
                    />
                </div>
            </div>
        </>
    )
}

export default Home
