import { Component } from "react"
import { nanoid } from "nanoid"
import PropTypes from 'prop-types';
import styles from './ContactForm.module.css'

export class ContactForm extends Component {

    static propTypes = {
        onSubmit: PropTypes.func.isRequired
    }

    state= {
        name: '',
        number: '',
        }

    nameInputId = nanoid()
    numberInputId = nanoid()

    handleChange = e => {
        this.setState({
          [e.target.name]: e.target.value,
          id: nanoid()
        })
      }
    
    handleSubmit = e => {
        e.preventDefault()
        this.props.onSubmit(this.state)
        this.resetForm()
        
    }
    
    resetForm = () => {
        this.setState({
            name: '',
            number: ''
        })
    }

    render() {
        const {nameInputId, numberInputId, handleChange, handleSubmit} = this;
        const {name, number} = this.state
        return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <label htmlFor={nameInputId} className={styles.name}>
                Name
            <input
                className={styles.inputName}
                type="text"
                name="name"
                id={nameInputId}
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
                value={name}
                onChange={handleChange}
            />
            </label>
            <label htmlFor={numberInputId} className={styles.number}>
                Number
            <input
                className={styles.inputNumber}
                type="tel"
                name="number"
                value={number}
                onChange={handleChange}
                id={numberInputId}
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
            />
            </label>
            <button type="submit" className={styles.submitButton}>Add contact</button>
        </form>)
    }
}