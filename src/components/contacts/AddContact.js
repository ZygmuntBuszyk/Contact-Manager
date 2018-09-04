import React, { Component } from 'react';
import { Consumer } from '../../context';
// import uuid from 'uuid';
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';

class AddContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = async (dispatch, e) => {
    e.preventDefault();

    const { name, email, phone } = this.state;

    //Check for error
    if (name === '') {
      this.setState({
        errors: {
          name: 'Name is required'
        }
      });
      return;
    }
    if (email === '') {
      this.setState({
        errors: {
          email: 'Email is required'
        }
      });
      return;
    }
    if (phone === '') {
      this.setState({
        errors: {
          phone: 'Phone is required'
        }
      });
      return;
    }

    const newContact = {
      name: name,
      email: email,
      phone: phone
    };

    const res = await axios.post(
      'https://jsonplaceholder.typicode.com/users',
      newContact
    );
    dispatch({ type: 'ADD_CONTACT', payload: res.data });

    // clear state. Czysci state po dodaniu kontaktu
    this.setState({
      name: '',
      email: '',
      phone: '',
      errors: {}
    });
    //redirect po dodaniu kontaktu
    this.props.history.push('/');
  };
  // Jest prostsza opcja blokujaca puste, nieuzupelnione wpisy. Html 5 umożliwia dodanie atrybutu 'required' i pola będą wymagane. Dodać w TextInputGroup.js
  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <Consumer>
        {value => {
          // value zawiera cały state
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Add Contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)} action="">
                  <TextInputGroup
                    // komponent TextInputGroup zostal stworzony, aby urozmaicic troche zwyczajne formy z tego co rozumiem.. Rozdzielić i zrobić je bardziej dynamiczne.
                    label="Name"
                    name="name"
                    placeholder="Enter Name.."
                    value={name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <TextInputGroup
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Enter Email.."
                    value={email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <TextInputGroup
                    label="Phone"
                    name="phone"
                    placeholder="Enter Phone.."
                    value={phone}
                    onChange={this.onChange}
                    error={errors.phone}
                  />
                  <input
                    type="submit"
                    value="Add Contact"
                    className="btn btn-light btn-block"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default AddContact;
