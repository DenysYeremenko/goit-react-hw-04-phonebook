import { ContactItem } from "components/ContactItem/ContactItem"
import PropTypes from "prop-types";
import style from "./ContactList.module.css"

export const ContactList = ({contacts, onDeleteContact}) => {
    
    return (
            <ul className={style.contactsList}>
                {contacts.map(contact => <ContactItem key={contact.id} contact={contact} onDeleteContact={onDeleteContact}/>)}
            </ul>
        )
}

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
        PropTypes.object.isRequired
    ).isRequired,
    onDeleteContact: PropTypes.func.isRequired
}