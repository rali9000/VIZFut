import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LineupInterface, TeamColorsInterface } from "../../types";
import styles from "./Lineup.module.css"
import Image from "../Image";
import { faFutbol } from "@fortawesome/free-solid-svg-icons";

const Lineup = ({ lineup, home, players }: LineupInterface) => {

    const formattedLineup = new Array();
    let current_row = 1;
    let temp_array = new Array();
    for (let i = 0; i < 11; i++) {
        const player = lineup.startXI[i].player;
        const player_info = players.filter((player_info: any) => player_info.player.id === player.id)[0];
        const formatted_player = {
            'player': player,
            'info': player_info.player,
            'stats': player_info.statistics[0]
        }
        if (parseInt(player.grid.charAt(0)) !== current_row) {
            current_row++;
            home ? formattedLineup.push(temp_array) : formattedLineup.unshift(temp_array);
            temp_array = new Array();
        }
        home ? temp_array.unshift(formatted_player) : temp_array.push(formatted_player);
    }
    home ? formattedLineup.push(temp_array) : formattedLineup.unshift(temp_array);

    console.log(lineup, players);
    console.log(formattedLineup);

    const player_colors: TeamColorsInterface = lineup.team.colors.player;
    const colors = {
        '--_primary': `#${player_colors.primary}`,
        '--_number': `#${player_colors.number}`,
        '--_border': `#${player_colors.border}`
    } as React.CSSProperties;
    const goalkeeper_colors: TeamColorsInterface = lineup.team.colors.goalkeeper;
    const gk_colors = {
        '--_primary': `#${goalkeeper_colors.primary}`,
        '--_number': `#${goalkeeper_colors.number}`,
        '--_border': `#${goalkeeper_colors.border}`
    } as React.CSSProperties;

    const rating_color = (rating: number): string => {
        let color: string = 'hsl(var(--rating-5))';

        if (rating >= 8) color = 'hsl(var(--rating-8))';
        else if (rating >= 7) color = `color-mix(in lab, hsl(var(--rating-8)), hsl(var(--rating-7)) ${(8 - rating) * 100}%)`
        else if (rating >= 6) color = 'hsl(var(--rating-6))';
        else if (rating >= 5) color = `color-mix(in lab, hsl(var(--rating-6)), hsl(var(--rating-5)) ${(6 - rating) * 100}%)`

        return color;
    }

    const ga_icons = (count: number, goal: boolean) => {
        const icons = new Array();
        for (let i = 0; i < count; i++) {
            const icon = goal ? <FontAwesomeIcon key={i} icon={faFutbol} /> : <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 435.84 249.63" stroke="none" fill="currentColor"><path d="M81.59,170.8c-.28-3.32-.16-6.62-.47-9.89-.27-2.88-2.3-5.32-5.06-6.19-3.7-1.17-7.47-2.2-11.39-3.06-2.91-.64-5.93.59-7.6,3.06-1.78,2.62-3.56,5.24-5.37,7.92-1.67,2.47-4.68,3.71-7.59,3.07-4.99-1.1-9.84-2.51-14.8-3.94-2.98-.86-5.09-3.5-5.29-6.59-.22-3.46-.43-6.85-.65-10.21-.16-2.56-1.65-4.84-3.92-6.03C-13.24,121.86,2.8,81.66,13.53,52.25,20.25,33.82,36.41-19.32,55.42,7.35c7.14,10.02,7.88,23.15,17.78,32.71,10.21,9.86,24.14,16.13,38.26,17.36,31.44,2.74,54.25-21.11,78.06-38.19,2.61-1.87,6.14-1.81,8.7.14,10.17,7.73,20.36,15.47,31.03,23.58,4.71,3.58,3.46,10.99-2.17,12.82-3.92,1.27-7.78,2.53-11.68,3.79-5.63,1.83-6.89,9.24-2.17,12.82l.16.12c1.9,1.44,4.39,1.87,6.66,1.15,10.43-3.32,20.8-6.62,31.26-9.94,2.17-.69,4.54-.34,6.41.96.44.31.88.62,1.32.93,4.91,3.49,3.72,11.09-2.01,12.95-3.87,1.26-7.72,2.5-11.61,3.76-5.63,1.83-6.89,9.23-2.18,12.82l.14.1c1.9,1.45,4.38,1.88,6.66,1.15,10.38-3.29,20.79-6.6,31.27-9.92,2.07-.66,4.35-.39,6.16.8.49.32.97.65,1.45.98,4.99,3.48,3.93,11.15-1.86,13.04-3.91,1.28-7.77,2.54-11.64,3.8-5.73,1.87-6.88,9.46-1.97,12.95.05.04.11.08.16.12,1.88,1.34,4.28,1.71,6.48,1.01,10.39-3.31,20.75-6.61,31.12-9.91,2.15-.68,4.5-.35,6.36.93.45.31.9.62,1.35.94,4.94,3.46,3.77,11.1-1.96,12.97-2.13.7-4.26,1.39-6.38,2.08-8,2.61-6.03,14.56,2.39,14.31,7.94-.23,15.8-4.23,27.91-8.39,2.03-.7,4.27-.46,6.12.65,24.33,14.51,65.6,31.21,81.94,53.24,18.38,24.78-3.32,44.41-27.02,47.73-2.1.29-3.99,1.44-5.16,3.21-2.05,3.09-4.1,6.18-6.21,9.36-1.3,1.96-3.45,3.19-5.8,3.28-3.68.14-7.36.08-11.05-.08s-6.86-3.25-7-7.07c-.02-.55-.03-1.1-.05-1.66-.1-3.88-3.23-7-7.1-7.12-1.53-.05-3.08-.02-4.64-.05-2.29-.04-4.49.99-5.87,2.82-1.88,2.47-3.32,5.29-5.19,7.93-1.43,2.02-3.79,3.17-6.27,3.1-3.81-.11-7.67-.7-11.55-1.32-3.42-.55-6-3.42-6.17-6.88-.05-.98-.07-1.97-.11-2.95-.15-3.38-2.63-6.21-5.95-6.84-2.32-.44-4.65-.81-6.99-1.06-2.63-.28-5.21.94-6.7,3.12-1.4,2.04-2.53,4.24-3.93,6.27-1.69,2.46-4.71,3.67-7.63,3.02-3.92-.87-7.83-1.94-11.78-3.15-2.85-.87-4.88-3.41-5.14-6.38-.14-1.58-.27-3.14-.41-4.71-.26-2.97-2.28-5.48-5.12-6.38-3.59-1.14-7.2-2.04-10.85-2.92-2.94-.71-6.01.45-7.74,2.93-.84,1.21-1.68,2.4-2.52,3.6-1.77,2.53-4.93,3.68-7.91,2.88l-11.37-3.05c-3.02-.81-5.21-3.44-5.42-6.55-.16-2.36-.07-4.74-.28-7.09-.23-2.61-1.88-4.89-4.27-5.96-29.13-13.08-62.11-34.41-94.3-37.25-2.63-.23-5.17,1.03-6.64,3.22-1.76,2.62-3.56,5.29-5.43,8.07-1.67,2.48-4.69,3.72-7.61,3.1-5.15-1.1-10.19-2.48-15.13-4.06-2.79-.89-4.82-3.36-5.07-6.27Z" /></svg>
            icons.push(icon);
        }

        return icons;
    }

    return (
        <article className={styles.lineup_wrapper}>
            {formattedLineup.map((row, rowIndex: number) => (
                <div key={rowIndex} className={styles.lineup_row}>
                    {row.map((player: any) => (
                        <div key={`${rowIndex}-${player.info.id}`} className={styles.player} style={player.player.pos === "G" ? gk_colors : colors}>
                            <div className={styles.portrait}>
                                <Image src={player.info.photo} alt="" maxRetries={3} />
                                <span className={styles.number}>{player.player.number}</span>
                                <span className={styles.rating}
                                    style={{ backgroundColor: `${rating_color(player.stats.games.rating)}` }}>
                                    {player.stats.games.rating}
                                </span>
                                {player.stats.goals.assists > 0 &&
                                    <span className={styles.assist}>
                                        {ga_icons(player.stats.goals.assists, false)}
                                    </span>
                                }
                                {player.stats.goals.total > 0 &&
                                    <span className={styles.goal}>
                                        {ga_icons(player.stats.goals.total, true)}
                                    </span>
                                }
                            </div>
                            {player.player.name}
                        </div>
                    ))}
                </div>
            ))}
        </article>
    )
}

export default Lineup