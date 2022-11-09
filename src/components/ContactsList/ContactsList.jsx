import React from "react";
import PropTypes from 'prop-types';
import css from "components/ContactsList/ContactsList.module.css";
import { ItemContactList } from "components/ItemContactList/ItemContactList";

export const ContactsList = ({ contacts, contactItems, deleteContact }) => {

  return (
    <ul className={css.contacts__list}>
      <ItemContactList 
        contacts={contactItems} 
        deleteContact={deleteContact} 
     />
    </ul>
  );
};

ContactsList.propTypes = {
  contacts: PropTypes.array,
  contactItems: PropTypes.array,
  deleteContact: PropTypes.func,
};