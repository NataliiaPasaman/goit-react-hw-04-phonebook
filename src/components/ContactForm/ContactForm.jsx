import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types';
import css from 'components/ContactForm/ContactForm.module.css';

export class ContactForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      number: '',
    };
  }

  onInputChange = evt => {
    const { name, value } = evt.currentTarget;
    this.setState({ [name]: value });
  };

  onSubmitForm = evt => {
    evt.preventDefault();

    const { name, number } = this.state;
    this.props.hadleSubmit(name, number);

    this.clearForm();
  };

  clearForm = () => {
   this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <form className={css.formPhone} onSubmit={this.onSubmitForm}>
        <label className={css.labelPhone}>
          Name
          <input
            className={css.inputPhone}
            type="text"
            name="name"
            value={this.state.name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={this.onInputChange}
          />
        </label>
        <label className={css.labelPhone}>
          Number
          <input
            className={css.inputPhone}
            type="tel"
            name="number"
            value={this.state.number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={this.onInputChange}
          />
        </label>
        <button className={css.btnPhone} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  hadleSubmit: PropTypes.func.isRequired,
};
