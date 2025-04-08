import { FiltersInterface } from "../../types"
import DateSelector from "./DateSelector"
import styles from './Filters.module.css'
import { MouseEvent, useState } from "react"

const Filters = ({ date_selector, league_info, handleOnChange, collapsed, toggle_collapsed }: FiltersInterface) => {

    const date_id = 'date_filter'
    const league_id = 'league_filter'

    let initCollapsed = new Map<string, boolean>();
    initCollapsed.set(date_id, true);
    initCollapsed.set(league_id, true);
    const [collapsedFilter, setCollapsedFilter] = useState<Map<string, boolean>>(initCollapsed);
    
    const toggleCollapsedFilter = (e: MouseEvent<HTMLElement>) => {
        const filter_id = e.currentTarget.parentElement?.parentElement?.id ?? '-1';
        setCollapsedFilter((prev) => {
            let status = new Map(prev);
            status.set(filter_id, !status.get(filter_id));
            return status;
        })
    };

    let league_arr = Array.from(league_info).filter((league: any) => league[1].matches.length > 0);

    return (
        <section className={`card_sec ${styles.filters_wrapper}`}>
            <div className="title_bar">
                <div className={styles.title}>
                    <span>&#x2630;&#x2630;</span>
                    <h3>Filter by...</h3>
                </div>
                <button
                    onClick={toggle_collapsed}
                    className='collapse_btn'
                >
                    <span>{collapsed? '\u25BC' : '\u25B2'}</span>
                </button>
            </div>
            <div className={`${styles.filters} ${collapsed && 'collapsed'}`}>
                <div className={styles.filter} id={date_id}>
                    <div className={styles.filter_info}>
                        <h4>Date</h4>
                        <button
                            onClick={toggleCollapsedFilter}
                            className='collapse_btn'
                        >
                            <span>{collapsedFilter.get(date_id) ? '\u25BC' : '\u25B2'}</span>
                        </button>
                    </div>
                    <div className={`${styles.filter_content} ${collapsedFilter.get(date_id) && 'collapsed'}`}>
                        <DateSelector
                            date={date_selector.date}
                            handleClick={date_selector.handleClick}
                        />
                    </div>
                </div>
                <div className={styles.filter} id={league_id}>
                    <div className={styles.filter_info}>
                        <h4>League</h4>
                        <button
                            onClick={toggleCollapsedFilter}
                            className='collapse_btn'
                        >
                            <span>{collapsedFilter.get(league_id) ? '\u25BC' : '\u25B2'}</span>
                        </button>
                    </div>
                    <div className={`${styles.filter_content} ${collapsedFilter.get(league_id) && 'collapsed'}`}>
                        <ul>
                            {league_arr.map((league: any[], index: number) => (
                                <li key={index}>
                                    <label htmlFor={`${league[0]}_filter`}>
                                        <img src={league[1].matches[0].league.logo} alt="" />
                                        <span>{league[1].matches[0].league.name}</span>
                                        <input
                                            type="checkbox"
                                            name={league[1].matches[0].league.name}
                                            id={`${league[0]}_filter`}
                                            checked={league[1].active}
                                            onChange={handleOnChange}
                                        />
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Filters