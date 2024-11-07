import { useEffect, useState } from 'react';
import fixtures from './assets/data/sample/fixtures.json'
import LeagueScores from './components/LeagueScores';
import { fetchFixturesByDate } from './functions/APIData';
import { parseAsIsoDate, useQueryState } from 'nuqs'
import DateSelector from './components/DateSelector';

function App() {
  const [matches, setMatches] = useState<any[]>((fixtures as any).response);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [triggerFetch, setTriggerFetch] = useState<boolean>(false);
  const [hasFetched, setHasFetched] = useState<boolean>(false);
  const [date, setDate] = useQueryState('d', parseAsIsoDate.withDefault(new Date()));

  useEffect(() => {
    if (hasFetched || !triggerFetch) return;

    const fetchMatches = async () => {
      try {
        const data = await fetchFixturesByDate(date);
        setMatches((data as any).response);
        setHasFetched(true);
      } catch (err) {
        setError(`Failed to fetch matches on ${date.toLocaleDateString}.`);
      } finally {
        setLoading(false);
      }
    }

    fetchMatches();
  }, [triggerFetch, hasFetched]);

  const handleFetchClick = () => {
    if (!hasFetched) setTriggerFetch(true);
  }

  const incrementDate = (event: any) => {
    let desiredDate: Date = date;
    let id = event.target.id;
    if (id === "inc_btn") desiredDate.setDate(desiredDate.getDate() + 1);
    else desiredDate.setDate(desiredDate.getDate() - 1);
    setDate(desiredDate);
    setHasFetched(false);
    handleFetchClick();
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // World Cup, Champion's League, English Premier League, La Liga, Serie A, Bundesliga, Ligue 1, Eredivisie
  let homeLeagueIds = [1, 2, 39, 140, 135, 78, 61, 88];

  return (
    <>
      <h1>FootStats</h1>
      <DateSelector
        date={date}
        handleClick={incrementDate}
      />
      <button onClick={incrementDate}>Fetch Today's Games</button>
      <section>
        {homeLeagueIds.map((id: number, index: number) => (
          <LeagueScores
            matches={matches.filter((match: any) => match.league.id === id)}
            id={id}
            key={`${index}_${id}`}
          />
        ))}
      </section>
    </>
  )
}

export default App
