import { nanoid } from "nanoid";
import PropTypes from 'prop-types';
import style from "./ContactFilter.module.css"

export const ContactFilter = ({onChange, value}) => {
    const nameInputId = nanoid();
    return (
        <label htmlFor={nameInputId} className={style.filterLabel}> Find contacts by name
            <input
                className={style.filterInput}
                placeholder="Search"
                type="search" 
                name="filter"
                id={nameInputId}
                onChange={onChange}
                value={value}
                >
                </input>
        </label>
    )
}

ContactFilter.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired
}