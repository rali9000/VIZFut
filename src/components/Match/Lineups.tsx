import { LineupsInterface } from '../../types'
import styles from './Lineups.module.css'
import Lineup from './Lineup'
import Image from '../Image'

const Lineups = ({ lineups, players }: LineupsInterface) => {
    return (
        <section className={styles.lineups_wrapper}>
            <div className={styles.lineups}>
                <div className={styles.field}></div>
                <Lineup
                    lineup={lineups[0]}
                    players={players[0].players}
                    home={true}
                />
                <Lineup
                    lineup={lineups[1]}
                    players={players[1].players}
                />
            </div>

            <div className={styles.coaches_wrapper}>
                <div className={styles.coach}>
                    <Image src={lineups[0].coach.photo} draggable={false} alt='' />
                    <span className={styles.coach_name}>{lineups[0].coach.name}</span>
                </div>
                <div className={styles.coach}>
                    <span className={styles.coach_name}>{lineups[1].coach.name}</span>
                    <Image src={lineups[1].coach.photo} draggable={false} alt='' />
                </div>
            </div>
        </section>
    )
}

export default Lineups