import React, { Component } from 'react';
import Contact from './Contact';
import { Consumer } from '../../context';

// Contacts to parent component Contact 'u

class Contacts extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          const { contacts } = value;
          return (
            // react fragment to opcja, ktora powstala w React 16, aby nie byl potrzebny otwierajacy oraz zamykajacy <div> </div>
            <React.Fragment>
              <h1 className="display-4 mb-2">
                <span className="text-danger">Contact </span> List
              </h1>
              {contacts.map(contact => (
                // po '<Contact' przekazuje wartosci np. obiekt, albo funkcje
                <Contact key={contact.id} contact={contact} />
              ))}
            </React.Fragment>
          );
        }}
      </Consumer>
    );
  }
}

export default Contacts;
