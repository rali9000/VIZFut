import { DateSelectorInterface } from "../../types"
import Calendar from 'react-calendar'
import './Calendar.css'
import '../../App.css'
import styles from './DateSelector.module.css'

const DateSelector = ({ date, handleClick }: DateSelectorInterface) => {
    let date_display: string;
    let months = new Map<number, string>([
            [0, "January"],
            [1, "February"],
            [2, "March"],
            [3, "April"],
            [4, "May"],
            [5, "June"],
            [6, "July"],
            [7, "August"],
            [8, "September"],
            [9, "October"],
            [10, "November"],
            [11, "December"]
    ]);
    let exampleDate = new Date();
    let inputDate = new Date(date);

    if (inputDate.toDateString() == exampleDate.toDateString()) date_display = "Today";
    else date_display = `${months.get(inputDate.getMonth())} ${inputDate.getDate()}, ${inputDate.getFullYear()}`;
    let min_date = new Date('08-17-2024');
    let max_date = new Date('05-31-2025');

    return (
        <div className={styles.wrapper}>
            <div className={styles.btns_wrapper}>
                <button id="dec_btn" onClick={handleClick} className="collapse_btn small">&#x25C0;</button>
                <span>{date_display}</span>
                <button id="inc_btn" onClick={handleClick} className="collapse_btn small">&#x25B6;</button>
            </div>
            <Calendar 
                value={date}
                minDate={min_date}
                maxDate={max_date}
                minDetail='month'
                calendarType='gregory'
                nextLabel='&#x25B6;'
                prevLabel='&#x25C0;'
                // onChange={}
            />
        </div>
    )
}

export default DateSelector