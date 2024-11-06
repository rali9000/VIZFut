import styles from "./MatchScore.module.css"
import { MatchScoreInterface } from "../types"
import placeholder from "../assets/images/placeholder/badge.webp";
import { useState, useRef, useEffect } from "react";

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

    
    const [isIntersecting, setIsIntersecting] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsIntersecting(entry.isIntersecting);
        }, {rootMargin: "12px"});
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <li className={styles.match}>
                <div className={styles.home}>
                    <p className={home.winner ? styles.winner : styles.loser}>{home.name}</p>
                    <img src={(isIntersecting) ? home.logo : placeholder} ref={ref} className={styles.logo} alt="" draggable="false" loading="lazy" />
                </div>
                {score()}
                <div className={styles.away}>
                    <img src={(isIntersecting) ? away.logo : placeholder} ref={ref} className={styles.logo} alt="" draggable="false" loading="lazy" />
                    <p className={away.winner ? styles.winner : styles.loser}>{away.name}</p>
                </div>
        </li>
    )
}

export default MatchScore