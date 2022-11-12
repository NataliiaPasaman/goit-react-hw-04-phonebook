import { nanoid } from 'nanoid';
import { ContactForm } from "./ContactForm/ContactForm";
import { Filter } from "./Filter/Filter";
import { ContactsList } from "./ContactsList/ContactsList";
import { useState } from 'react';

const CONTACTS = 'contacts';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  

  // componentDidMount() {
  //   const contactString = localStorage.getItem(CONTACTS);
  //   const contactParsed = JSON.parse(contactString);

  //   if(contactParsed) {
  //     return this.setState({ contacts: contactParsed });
  //   }
  // }

  // componentDidUpdate(prevState) {
  //   const { contacts } = this.state;

  //   if (prevState.contacts !== contacts) {
  //     localStorage.setItem(CONTACTS, JSON.stringify(contacts));
  //   }
  // }

  const hadleSubmit = (name, number) => {
    const contact = {
      id: nanoid(12),
      name,
      number,
    };

    const isfindContact = contacts.find(oneContact => oneContact.name === contact.name);
    if (isfindContact) {
      alert(`${contact.name} is already in contacts`);
      return;
    };
    setContacts(prevState => [contact, ...prevState]);
  };

  const onInputFilterChange = e => {
    setFilter(e.target.value);
  };

  const getFilterContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

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
        <ContactForm hadleSubmit={hadleSubmit} />
        <h2>Contacts</h2>
        <Filter
          onInputFilterChange={onInputFilterChange}
          filter={filter}
        />
        <ContactsList
          FilterContact={getFilterContacts()}
          deleteContact={deleteContact}
          contacts={contacts}
        />
      </div>
    );
};
