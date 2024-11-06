import { useEffect, useState } from 'react';
import fixtures from './assets/data/sample/fixtures.json'
import LeagueScores from './components/LeagueScores';
import { fetchFixturesByDate } from './functions/APIData';

function App() {
  const [matches, setMatches] = useState<any[]>((fixtures as any).response);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [triggerFetch, setTriggerFetch] = useState<boolean>(false);
  const [hasFetched, setHasFetched] = useState<boolean>(false);

  useEffect(() => {
    if (hasFetched || !triggerFetch) return;

    const fetchToday = async () => {
      try {
        setLoading(true);
        let today = new Date();
        console.log(today);
        const data = await fetchFixturesByDate(today);
        setMatches((data as any).response);
        setHasFetched(true);
      } catch (err) {
        setError("Failed to fetch today's games.");
      } finally {
        setLoading(false);
      }
    }

    fetchToday();
  }, [triggerFetch, hasFetched]);

  const handleFetchClick = () => {
    if (!hasFetched) setTriggerFetch(true);
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // World Cup, Champion's League, English Premier League, La Liga, Serie A, Bundesliga, Ligue 1, Eredivisie
  let homeLeagueIds = [1, 2, 39, 140, 135, 78, 61, 88];

  return (
    <>
      <h1>Cookie Clicker Butt</h1>
      <button onClick={handleFetchClick}>Fetch Today's Games</button>
      {homeLeagueIds.map((id: number, index: number) => (
        <LeagueScores
          matches={matches.filter((match: any) => match.league.id === id)}
          id={id}
          key={`${index}_${id}`}
        />
      ))}
    </>
  )
}

export default App
