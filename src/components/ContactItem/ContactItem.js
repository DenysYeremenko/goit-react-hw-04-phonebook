import PropTypes from 'prop-types';
import style from "./ContactItem.module.css"

export const ContactItem = ({contact, onDeleteContact}) => {
    return <li className={style.contactItem}>{contact.name}: {contact.number}
    <button type="button" className={style.deleteButton} onClick={() => onDeleteContact(contact.id)}>Delete</button>
    </li>
}

ContactItem.propTypes = {
    contact: PropTypes.shape({
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired
    }).isRequired,
    onDeleteContact: PropTypes.func.isRequired
}