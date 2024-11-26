import { DateSelectorInterface } from "../types"

const DateSelector = ({ date, handleClick }: DateSelectorInterface) => {
    let text: string;
    let exampleDate = new Date();
    let inputDate = new Date(date);

    if (inputDate.toDateString() == exampleDate.toDateString()) text = "Today";
    else text = date.toLocaleDateString();
    return (
        <div>
            <button id="dec_btn" onClick={handleClick}>◀</button>
            <span>{text}</span>
            <button id="inc_btn" onClick={handleClick}>▶</button>
        </div>
    )
}

export default DateSelector