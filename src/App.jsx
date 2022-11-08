import { useEffect } from 'react';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'redux/setFilter';
import { addContact, getContatcts, deleteContact } from 'redux/phoneOperations';

import { Filter, ContactList, Section, ContactForm } from './components';

const App = () => {
  const dispatch = useDispatch();
  const { contacts, filterTerm, isFetching, error } = useSelector(
    state => state.contacts
  );

  useEffect(() => {
    dispatch(getContatcts());
  }, [dispatch]);

  const handleAddContact = newContactData => {
    const newContactEntity = {
      id: nanoid(),
      ...newContactData,
    };

    if (!checkNewContactPresence(newContactEntity.name)) {
      dispatch(addContact(newContactEntity));
    } else {
      alert(`${newContactEntity.name} is already in contacts!`);
    }
  };

  const handleDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  const handleFilterContactsByName = ({ target: { value } }) => {
    dispatch(setFilter(value));
  };

  const checkNewContactPresence = contactName => {
    return contacts.some(contact => contact.name === contactName);
  };

  const contactsFilteredByName = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filterTerm.toLowerCase())
  );

  return (
    <div className="app">
      <Section title="Phonebook">
        <ContactForm addContact={handleAddContact} />
      </Section>
      <Section title="Contacts">
        <Filter filter={filterTerm} onChange={handleFilterContactsByName} />
        <ContactList
          contacts={contactsFilteredByName}
          filter={filterTerm}
          isFetching={isFetching}
          onDelete={handleDeleteContact}
        />
        {!!error && <div className="error">{error.message}</div>}
      </Section>
    </div>
  );
};

export default App;
