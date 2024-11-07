import { DateSelectorInterface } from "../types"

const DateSelector = ({ date, handleClick }: DateSelectorInterface) => {
    return (
        
        <div>
            <button id="dec_btn" onClick={handleClick}>◀</button>
            {date.toLocaleDateString()}
            <button id="inc_btn" onClick={handleClick}>▶</button>
        </div>
    )
}

export default DateSelector