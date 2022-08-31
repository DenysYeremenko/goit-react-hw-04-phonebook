import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { ContactFilter } from './ContactFilter/ContactFilter';
import style from './App.module.css';
import { useState, useEffect } from 'react';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const localContact = JSON.parse(localStorage.getItem('contacts'));

    if (localContact) {
      setContacts(localContact);
    }
  }, []);

  useEffect(() => {
    if (contacts.length > 0) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }, [contacts]);

  const formSubmitHandler = newContact => {
    if (
      contacts.findIndex(
        contact =>
          contact.name.toLocaleLowerCase() ===
          newContact.name.toLocaleLowerCase()
      ) >= 0
    ) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    } else {
      setContacts(prevState => {
        return [newContact, ...prevState];
      });
    }
  };

  const filterChange = e => {
    setFilter(e.target.value);
  };

  const filteredContacts = () => {
    if (filter !== '') {
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      );
    } else {
      return contacts;
    }
  };

  const onDeleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  return (
    <>
      <h1 className={style.phonebookHeader}>Phonebook</h1>
      <ContactForm onSubmit={formSubmitHandler} />
      <h2 className={style.contactsHeader}>Contacts</h2>
      <ContactFilter value={filter} onChange={filterChange} />
      {contacts.length > 0 && (
        <ContactList
          contacts={filteredContacts()}
          onDeleteContact={onDeleteContact}
        />
      )}
    </>
  );
};
