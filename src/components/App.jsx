import React from "react";
import { Component } from "react";
import { nanoid } from 'nanoid';
import { ContactForm } from "./ContactForm/ContactForm";
import { Filter } from "./Filter/Filter";
import { ContactsList } from "./ContactsList/ContactsList";

const CONTACTS = 'contacts';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      contacts: [],
      filter: '',
    };
  }

  componentDidMount() {
    const contactString = localStorage.getItem(CONTACTS);
    const contactParsed = JSON.parse(contactString);

    if(contactParsed) {
      return this.setState({ contacts: contactParsed });
    }
  }

  componentDidUpdate(prevState) {
    const { contacts } = this.state;

    if (prevState.contacts !== contacts) {
      localStorage.setItem(CONTACTS, JSON.stringify(contacts));
    }
  }

  hadleSubmit = (name, number) => {
    const contact = {
      id: nanoid(12),
      name,
      number,
    };

    const isfindContact = this.state.contacts
    .find(oneContact => oneContact.name === contact.name);

    if (isfindContact) {
      alert(`${contact.name} is already in contacts`);
      return;
    }

    this.setState(({ contacts }) => ({ contacts: [contact, ...contacts]}));
  };

  onInputFilterChange = e => {
    this.setState({ filter: e.target.value });
  };

  getFilterContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const fieldFilter = this.getFilterContacts();

    return (
      <div
        style={{
          height: '100vh',
          padding: '40px',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <h1>Phonebook</h1>
        <ContactForm hadleSubmit={this.hadleSubmit} />
        <h2>Contacts</h2>
        <Filter
          onInputFilterChange={this.onInputFilterChange}
          filter={this.state.filter}
        />
        <ContactsList
          contactItems={fieldFilter}
          deleteContact={this.deleteContact}
          contacts={this.state.contacts}
        />
      </div>
    );
  }
};
