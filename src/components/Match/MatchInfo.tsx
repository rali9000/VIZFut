import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faCalendar } from '@fortawesome/free-solid-svg-icons'
import { MatchInfoInterface } from '../../types'
import styles from './MatchInfo.module.css'
import Image from '../Image'

const MatchInfo = ({ home, away, status, date, location, referee }: MatchInfoInterface) => {
    return (
        <section className={styles.info}>
            <h1 className={styles.main_info}>
                <div className={styles.home}>
                    <Image className={styles.logo} src={home.logo} alt="" />
                    <span className={styles.name}>{home.name}</span>
                </div>
                <span className={styles.score}>{`${home.goals} - ${away.goals}`}</span>
                <div className={styles.away}>
                    <Image className={styles.logo} src={away.logo} alt="" />
                    <span className={styles.name}>{away.name}</span>
                </div>
            </h1>
            <div className={styles.secondary_info}>
                <span className={styles.status}>
                    {status}
                </span>
                <div className={styles.smaller_info}>
                    <span className={styles.date}>
                        <FontAwesomeIcon icon={faCalendar} />{date}
                    </span>
                    <span className={styles.location}>
                        <FontAwesomeIcon icon={faLocationDot} />{location}
                    </span>
                    <span className={styles.referee}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 466.84 304.49" fill='currentColor'>
                            <path d="M177.26,49.77c6.56,2.32,12.65,5.53,18.64,8.99,32.48,18.78,64.98,37.52,97.47,56.29,8.85,5.11,10.59,11.52,5.56,20.29-1.13,1.96-2.11,4.02-3.42,5.85-1.92,2.69-1.04,4.12,1.61,5.59,7.22,3.99,14.35,8.14,21.43,12.37,2.14,1.28,4.11,1.39,6.44.75,8.2-2.29,16.45-4.39,24.66-6.66,4.62-1.28,8.77-.72,12.98,1.74,21.37,12.48,42.84,24.78,64.26,37.18,7.85,4.54,9.68,11.36,5.16,19.22-10.09,17.53-20.36,34.95-30.25,52.58-3.89,6.94-9.31,9.2-16.89,8.13-29.76-4.19-59.53-8.23-89.3-12.33-20.42-2.81-40.84-5.59-61.24-8.51-2.69-.39-4.56.28-6.28,2.29-16.47,19.22-36.99,32.29-61.26,39.19-27.19,7.73-54.15,6.64-80.64-3.46-21.99-8.38-40.54-21.59-54.99-40.17C8.1,219.4-.49,185.81,5.01,148.6c7.27-34.9,18.63-54.69,45.23-78.29,38.63-29.79,80.93-36.83,127.03-20.54ZM110.31,215.05c20.86,11.95,48.25,7.02,62.59-16.42,12-20.24,7.32-47.24-16.38-60.8-20.55-12.07-48.19-6.94-62.53,16.31-12,20.24-7.1,46.88,16.32,60.91Z" />
                            <path d="M355.21,62.32c6.25-10.82,12.47-21.66,18.75-32.46,4.19-7.2,11.47-9.24,18.31-5.21,6.59,3.88,8.34,11.18,4.26,18.27-12.54,21.77-25.1,43.53-37.68,65.27-4.09,7.07-11.3,9.19-17.96,5.41-6.9-3.91-8.76-11.23-4.61-18.47,6.28-10.96,12.62-21.88,18.93-32.81Z" />
                            <path d="M301.88,1.92c3.78,2.09,6.01,5.3,6.53,9.51,2.62,21.23,5.26,42.46,7.64,63.72.82,7.36-4.49,13.83-11.18,14.56-7.61.83-13.98-3.86-14.97-11.63-2.68-20.96-5.16-41.94-7.62-62.92-.64-5.47,1.45-9.97,6.05-13.01,4.39-2.9,9-2.74,13.56-.22Z" />
                            <path d="M380.29,121.09c1.34-2.92,4.08-4.73,7.2-6.06,18.82-8.04,37.62-16.12,56.47-24.07,7.77-3.28,15.41-.43,18.42,6.6,2.91,6.78-.29,14.39-7.79,17.63-19.15,8.28-38.34,16.46-57.56,24.56-5.79,2.44-11.61,1.03-15.3-3.23-3.94-4.56-4.52-9.99-1.44-15.42Z" />
                        </svg>
                        {referee}
                    </span>
                </div>
            </div>
        </section>
    )
}

export default MatchInfo