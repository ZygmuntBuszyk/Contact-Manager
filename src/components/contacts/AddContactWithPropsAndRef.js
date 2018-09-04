import React, { Component } from 'react';

class AddContact extends Component {
  constructor(props) {
    super(props);

    this.nameInput = React.createRef();
    this.emailInput = React.createRef();
    this.phoneInput = React.createRef();
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const contact = {
      name: this.nameInput.current.value,
      email: this.emailInput.current.value,
      phone: this.phoneInput.current.value
    };
    console.log(contact);
  };

  static defaultProps = {
    name: 'Name',
    email: 'Email',
    phone: 'phone'
  };

  render() {
    const { name, email, phone } = this.props;
    return (
      <div className="card mb-3">
        <div className="card-header">Add Contact</div>
        <div className="card-body">
          <form onSubmit={this.onSubmit} action="">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                //brak onChange, za to trzeba ustawic default value.
                // A aby przekazać input używa się refs
                defaultValue={name}
                ref={this.nameInput}
                name="name"
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter name..."
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Name</label>
              <input
                defaultValue={email}
                ref={this.emailInput}
                name="email"
                type="email"
                className="form-control form-control-lg"
                placeholder="Enter email..."
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Name</label>
              <input
                defaultValue={phone}
                ref={this.phoneInput}
                name="phone"
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter phone..."
              />
            </div>
            <input
              type="submit"
              value="Add Contact"
              className="btn btn-light btn-block"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default AddContact;
