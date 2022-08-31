import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { ContactFilter } from './ContactFilter/ContactFilter';
import style from './App.module.css';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  componentDidMount() {
    const localContact = JSON.parse(localStorage.getItem('contacts'));
    if (localContact) {
      this.setState({
        contacts: localContact,
      });
    }
  }

  formSubmitHandler = newContact => {
    if (
      this.state.contacts.findIndex(
        contact =>
          contact.name.toLocaleLowerCase() ===
          newContact.name.toLocaleLowerCase()
      ) >= 0
    ) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    } else {
      this.setState(prevState => ({
        contacts: [newContact, ...prevState.contacts],
      }));
    }
  };

  filterChange = e => {
    this.setState({
      filter: e.target.value,
    });
  };

  filteredContacts = () => {
    const { filter, contacts } = this.state;
    if (filter !== '') {
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      );
    } else {
      return contacts;
    }
  };

  onDeleteContact = contactId => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== contactId),
    });
  };

  render() {
    return (
      <>
        <h1 className={style.phonebookHeader}>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmitHandler} />
        <h2 className={style.contactsHeader}>Contacts</h2>
        <ContactFilter value={this.state.filter} onChange={this.filterChange} />
        <ContactList
          contacts={this.filteredContacts()}
          onDeleteContact={this.onDeleteContact}
        />
      </>
    );
  }
}
