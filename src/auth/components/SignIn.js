import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { signIn } from '../api'
import messages from '../messages'

class SignIn extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignIn = event => {
    event.preventDefault()

    const { alert, history, setUser } = this.props

    signIn(this.state)
      .then(res => setUser(res.data.user))
      .then(() => alert(messages.signInSuccess, 'success'))
      .then(() => history.push('/'))
      .catch(() => {
        alert(messages.signInFailure, 'warning')
        this.setState({ email: '', password: '' })
      })
  }

  render () {
    const { email, password } = this.state

    return (
      <Form className='auth-form' onSubmit={this.onSignIn}>
        <h3 className='signup'>Sign In</h3>
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
          <Form.Text className="text-danger">
          </Form.Text>
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
        <Button type="submit">Sign In</Button>
      </Form>
    )
  }
}

export default withRouter(SignIn)
