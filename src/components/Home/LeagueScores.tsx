import { LeagueScoresInterface, MatchScoreInterface, MatchScoreTeamInterface } from '../../types';
import MatchScore from './MatchScore';
import styles from "./LeagueScores.module.css";
import "../../App.css";
import Image from '../Image';
import placeholder from "../../assets/images/placeholder/badge.png";
const LeagueScores = ({ matches, collapsed, toggle_collapsed, active, id }: LeagueScoresInterface) => {

    if (matches === undefined || matches.length === 0) return null;

    function matchScoreProps(match: any): MatchScoreInterface {
        const home: MatchScoreTeamInterface = {
            id: match.teams.home.id,
            name: match.teams.home.name,
            logo: match.teams.home.logo,
            winner: match.teams.home.winner,
            goals: match.goals.home
        };
        const away: MatchScoreTeamInterface = {
            id: match.teams.away.id,
            name: match.teams.away.name,
            logo: match.teams.away.logo,
            winner: match.teams.away.winner,
            goals: match.goals.away
        };
        const props: MatchScoreInterface = {
            id: match.fixture.id,
            teams: { home: home, away: away },
            timestamp: match.fixture.timestamp,
            status: {
                short: match.fixture.status.short,
                full: match.fixture.status.long
            }
        };
        return props;
    }

    let leagueName = matches[0].league.name;
    let sectionId = id.toString();
    let leagueLogo = `https://media.api-sports.io/football/leagues/${id}.png`;
    let leagueFlag = matches[0].league.flag;

    return (
        <article className={`card_sec ${styles.league} ${active ? '' : styles.inactive}`} id={sectionId}>
            <div className='title_bar'>
                <div className={styles.info}>
                    <Image src={leagueLogo} fallbackSrc={placeholder} className={styles.logo} alt="" draggable={false} lazyLoad={true} />
                    <h3>{leagueName}</h3>
                    <Image src={leagueFlag} className={styles.flag} alt="" draggable={false} lazyLoad={true} />
                </div>
                <button onClick={toggle_collapsed} className='collapse_btn' id={`${sectionId}_collapse_btn`}>
                    <span>{collapsed? '\u25BC' : '\u25B2'}</span>
                </button>
            </div>
            <ul className={`content ${styles.matches} ${collapsed && 'collapsed'}`}>
                {matches?.map((match: any, index: number) => (
                    <MatchScore
                        {...matchScoreProps(match)}
                        key={`${index}_${match.fixture.id}`}
                    />
                ))}
            </ul>
        </article>
    )
}

export default LeagueScores