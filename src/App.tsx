// import API_HOST, { Env } from './functions/APIData'
import matches from './assets/data/sample/fixtures.json'
import MatchScore from './components/MatchScore';
import { MatchScoreInterface, MatchScoreTeamInterface } from './types';

function App() {

  // console.log(API_HOST.fetch(req, env));

  // fetch(`https://v3.football.api-sports.io/fixtures?date=2024-10-19&timezone=${Intl.DateTimeFormat().resolvedOptions().timeZone}`, {
  //   "method": "GET",
  //   "headers": {
  //     "x-rapidapi-host": "v3.football.api-sports.io",
  //     "x-rapidapi-key": "xXXXXXXXXXXXXXXXXXXXXXXXXXXXXx"
  //   }
  // })
  // .then(response => {
  //   console.log(response);
  // })
  // .catch(err => {
  //   console.log(err);
  // });

  let premGames = (matches as any).response.filter((match: any) => match.league.id === 39);
  let laligaGames = (matches as any).response.filter((match: any) => match.league.id === 140);

  function matchScoreProps (match: any):MatchScoreInterface {
    var props: MatchScoreInterface;
      let home:MatchScoreTeamInterface = {
        id: match.teams.home.id,
        name: match.teams.home.name,
        logo: match.teams.home.logo,
        winner: match.teams.home.winner,
        goals: match.goals.home,
      };
      let away:MatchScoreTeamInterface = {
        id: match.teams.away.id,
        name: match.teams.away.name,
        logo: match.teams.away.logo,
        winner: match.teams.away.winner,
        goals: match.goals.away,
      };
      props = {
        id: match.fixture.id,
        teams: {home: home, away: away},
        timestamp: match.fixture.timestamp,
        status: match.fixture.status
      };
    return props;
  }

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      {premGames.map((match: any, index: number) => (
        <MatchScore
          {...matchScoreProps(match)} 
          key={index}
        />
      ))}
      {laligaGames.map((match: any, index: number) => (
        <MatchScore
          {...matchScoreProps(match)}
          key={index}
        />
      ))}
    </>
  )
}

export default App
