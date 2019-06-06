import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import apiUrl from '../apiConfig'

class CreateMovie extends Component {
  constructor () {
    super()

    this.state = {
      title: '',
      starring: '',
      runtime: '',
      description: ''
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/movies`,
      method: 'post',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        movie: {
          title: this.state.title,
          starring: this.state.starring,
          runtime: this.state.runtime,
          description: this.state.description
        }
      }
    })
      .then(response => this.setState({
        movie: response.data.movie
      }))
      .then(() => this.props.alert(`${this.state.title} has been added to the library!`, 'success'))
      .then(() => this.props.history.push('/'))
      .catch(() => {
        this.props.alert('Whoops! Failed to add your movie. Please try again.', 'danger')
        this.setState({
          title: '',
          starring: '',
          runtime: '',
          description: ''
        })
      })
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  resetForm = () => this.setState({
    title: '',
    starring: '',
    runtime: '',
    description: ''
  })

  render () {
    const { title, starring, runtime, description } = this.state

    return (
      <Form className="form" onSubmit={this.handleSubmit}>
        <h2>Add A Movie</h2>
        <Form.Group controlId="movieTitle">
          <Form.Label>Movie Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            name="title"
            required
            onChange={this.handleChange}
            placeholder="Enter the movie title"
          />
        </Form.Group>
        <Form.Group controlId="starring">
          <Form.Label>Starring</Form.Label>
          <Form.Control
            type="string"
            value={starring}
            name="starring"
            required
            placeholder="Starring"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="runtime">
          <Form.Label>Runtime</Form.Label>
          <Form.Control
            type="number"
            value={runtime}
            name="runtime"
            required
            placeholder="Runtime"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            value={description}
            name="description"
            required
            placeholder="Description"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className="m-1"
        >
          Submit
        </Button>
        <Button
          variant="danger"
          type="button"
          className="m-1"
          onClick={this.resetForm}
        >
          Reset
        </Button>
      </Form>
    )
  }
}

export default withRouter(CreateMovie)
