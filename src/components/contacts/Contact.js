import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Consumer } from '../../context';
import axios from 'axios';
// gdy w komponencie używa się linka do url, chce sie przejsc do podstrony, to potrzbny jest react router
import { Link } from 'react-router-dom';

class Contact extends Component {
  state = {
    showContactInfo: false
  };
  onShowClick = () => {
    this.setState({
      showContactInfo:
        //ustawia boolean na odwrotny do aktualnego
        !this.state.showContactInfo
    });
  };

  onDeleteClick = async (id, dispatch) => {
    // try i catch sa tylko na wymogii tej aplikacji. Poniewaz nie mozna usunac z bazy , czyli z fake api , kontaktu ktory zostal dodany przez aplikacje, poniewaz (w tym przypadku), przy tworzeniu nie zapisujemy w bazie czy tym api, ale w podrecznej pamieci tylko.
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);

      dispatch({ type: 'DELETE_CONTACT', payload: id });
    } catch (e) {
      dispatch({ type: 'DELETE_CONTACT', payload: id });
    }
  };

  render() {
    // dekonstrukcja własności(props), czyli 'wyjmowanie' zmiennych z obiektu
    const { id, name, email, phone } = this.props.contact;
    const { showContactInfo } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h3>
                {name}{' '}
                <i
                  onClick={this.onShowClick}
                  className="fas fa-sort-down"
                  style={{ cursor: 'pointer' }}
                />
                <i
                  className="fas fa-times"
                  style={{ cursor: 'pointer', float: 'right', color: 'red' }}
                  onClick={this.onDeleteClick.bind(this, id, dispatch)}
                />
                <Link to={`contact/edit/${id}`}>
                  <i
                    style={{
                      cursor: 'pointer',
                      float: 'right',
                      color: 'black',
                      marginRight: '1rem'
                    }}
                    className="fas fa-pencil-alt"
                  />
                </Link>
              </h3>
              {showContactInfo ? (
                <ul className="list-group">
                  <li className="list-group-item">Email: {email}</li>
                  <li className="list-group-item">Phone: {phone}</li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}
//przy kazdym przekazywaniu 'prop' trzeba dodac tu
Contact.propTypes = {
  contact: PropTypes.object.isRequired
};
export default Contact;
