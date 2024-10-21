import styles from "./MatchScore.module.css"
import { MatchScoreInterface } from "../types"

const MatchScore = ({ teams, timestamp, status }: MatchScoreInterface) => {
    let home = teams.home;
    let away = teams.away;
    let kickoff = new Date(0);
    kickoff.setUTCSeconds(timestamp);

    const score = () => {
        let indicator = (status === "AET") ? <p className={styles.indicator}>p</p> :
            (status === "PEN") ? <p className={styles.indicator}>e</p> : null;
        let time = `${(kickoff.getHours() > 12) ? kickoff.getHours() % 12 : kickoff.getHours()}
                    :
                    ${(kickoff.getMinutes() < 10) ? `0${kickoff.getMinutes()}` : kickoff.getMinutes()}`
        let text = (status !== "NS") ? `${home.goals} - ${away.goals}` : `${time}`
        return (
            <div className={styles.score}>
                {home.winner && indicator}
                <p>
                    {text}
                </p>
                {away.winner && indicator}
            </div>
        );
    }

    return (
        <article className={styles.match}>
            <div className={styles.home}>
                <img src={home.logo} className={styles.logo} alt="" />
                <p>{home.name}</p>
            </div>
            {score()}
            <div className={styles.away}>
                <p>{away.name}</p>
                <img src={away.logo} className={styles.logo} alt="" />
            </div>
        </article>
    )
}

export default MatchScore