import styles from "./MatchScore.module.css"
import { MatchScoreInterface } from "../../types"
import placeholder from "../../assets/images/placeholder/badge.png";
import Image from "../Image";
import { Link } from "react-router-dom";

const MatchScore = ({ id, teams, timestamp, status }: MatchScoreInterface) => {
    let home = teams.home;
    let away = teams.away;
    let kickoff = new Date(0);
    kickoff.setUTCSeconds(timestamp);

    const score = () => {
        let indicator_styles = `${styles.indicator} ${(home.winner) ? styles.left : styles.right}`;
        let indicator = (status.short === "AET") ? <p className={indicator_styles}>p</p> :
            (status.short === "PEN") ? <p className={indicator_styles}>e</p> : null;
        let time = `${(kickoff.getHours() > 12) ? kickoff.getHours() % 12 : kickoff.getHours()}
                    :
                    ${(kickoff.getMinutes() < 10) ? `0${kickoff.getMinutes()}` : kickoff.getMinutes()}`
        let text = (status.short !== "NS") ? `${home.goals} - ${away.goals}` : `${time}`
        return (
            <div className={styles.score}>
                {home.winner && indicator}
                <p>
                    {text}
                </p>
                <span title={status.full} className={styles.status}>{status.short}</span>
                {away.winner && indicator}
            </div>
        );
    }

    return (
        <li className={styles.match} id={id.toString()}>
            <Link to={`/match/${id}`}>
                <div className={styles.home}>
                    <p className={home.winner === false ? styles.loser : styles.winner}>{home.name}</p>
                    <Image src={home.logo} fallbackSrc={placeholder} className={styles.logo} alt="" draggable={false} lazyLoad={true} maxRetries={5}/>
                </div>
                {score()}
                <div className={styles.away}>
                    <Image src={away.logo} fallbackSrc={placeholder} className={styles.logo} alt="" draggable={false} lazyLoad={true} maxRetries={5}/>
                    <p className={away.winner === false ? styles.loser : styles.winner}>{away.name}</p>
                </div>
            </Link>
        </li>
    )
}

export default MatchScore