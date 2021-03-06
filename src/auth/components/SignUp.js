import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { signUp, signIn } from '../api'
import messages from '../messages'

class SignUp extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignUp = event => {
    event.preventDefault()

    const { alert, history, setUser } = this.props

    signUp(this.state)
      .then(() => signIn(this.state))
      .then(res => setUser(res.data.user))
      .then(() => alert(messages.signUpSuccess, 'success'))
      .then(() => history.push('/'))
      .catch(() => {
        alert(messages.signUpFailure, 'warning')
          .this.setState({ email: '', password: '', passwordConfirmation: '' })
      })
  }
  render () {
    const { email, password, passwordConfirmation } = this.state

    return (
      <Form className='form' onSubmit={this.onSignUp}>
        <h3 className='signup'>Sign Up</h3>
        <Form.Group controlId="email">
          <Form.Label className='signup'>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            required
            name="email"
            value={email}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label className='signup'>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            required
            name="password"
            value={password}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label className='signup'>Password</Form.Label>
          <Form.Control
            required
            name="passwordConfirmation"
            value={passwordConfirmation}
            type="password"
            placeholder="Confirm Password"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Button type="submit">Sign In</Button>
      </Form>
    )
  }
}

export default withRouter(SignUp)
