import { LeagueScoresInterface, MatchScoreInterface, MatchScoreTeamInterface } from '../types';
import MatchScore from './MatchScore';
import styles from "./LeagueScores.module.css";
import placeholder from "../assets/images/placeholder/badge.png";
import { useEffect, useRef, useState } from 'react';
const LeagueScores = ({ matches, id }: LeagueScoresInterface) => {
    
        const [isIntersecting, setIsIntersecting] = useState(false);
        const ref = useRef<HTMLDivElement | null>(null);
    
        useEffect(() => {
            if (!ref.current) return;
            const observer = new IntersectionObserver(([entry]) => {
                setIsIntersecting(entry.isIntersecting);
            }, {rootMargin: "24px"});
            const element = ref.current;
            observer.observe(element);
            return () => observer.unobserve(element);
        }, [ref, matches]);

    if (matches.length === 0) return null;

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
            status: match.fixture.status.short
        };
        return props;
    }

    let leagueName = matches[0].league.name;
    let sectionId = `${leagueName.replace(" ", "_")}_${id}`.toLowerCase();
    let leagueLogo = `https://media.api-sports.io/football/leagues/${id}.png`;
    let leagueFlag = matches[0].league.flag;

    

    function collapseLeague() {
        let league_section = document.getElementById(sectionId);
        let btn_text = document.getElementById(`${sectionId}_collapse_btn`)?.children[0];
        if (btn_text) (btn_text.innerHTML === '▲') ? btn_text.innerHTML = "▼" : btn_text.innerHTML = "▲";
        league_section?.classList.toggle(styles.collapsed);
    }

    return (
        <article className={styles.league} id={sectionId} ref={ref}>
            <div className={styles.info}>
                <button onClick={collapseLeague} id={`${sectionId}_collapse_btn`}><p>▲</p></button>
                <img src={(isIntersecting) ? leagueLogo : placeholder} className={styles.logo} alt="" draggable="false" loading="lazy" />
                <h3>{leagueName}</h3>
                <img src={(isIntersecting) ? leagueFlag : undefined} className={styles.flag} alt="" draggable="false" loading="lazy" />
            </div>
            <ul className={styles.matches}>
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