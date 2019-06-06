import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import apiUrl from '../apiConfig'

class UpdateMovie extends Component {
  constructor (props) {
    super(props)

    this.state = {
      movie: {
        title: '',
        starring: '',
        runtime: '',
        description: ''
      },
      updated: false
    }
  }
  async componentDidMount () {
    const response = await axios(`${apiUrl}/movies/${this.props.match.params._id}`)

    this.setState({ movie: response.data.movie })
  }

  handleUpdate = async event => {
    event.preventDefault()

    await axios({
      url: `${apiUrl}/movies/${this.props.match.params._id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        movie: {
          title: this.state.movie.title,
          starring: this.state.movie.starring,
          runtime: this.state.movie.runtime,
          description: this.state.movie.description
        }
      }
    })
      .then(response => this.setState({
        updated: true
      }))
      .then(() => this.props.alert(`${this.state.movie.title} has been added to the library!`, 'success'))
      // .then(() => this.props.history.push('/'))
      .catch(() => {
        this.props.alert('Whoops! Failed to add your movie. Please try again.', 'danger')
        this.setState({
          movie: {
            title: '',
            starring: '',
            runtime: '',
            description: ''
          }
        })
      })
  }

  handleChange = (event) => {
    const updatedField = { [event.target.name]: event.target.value
    }
    const editedMovie = Object.assign(this.state.movie, updatedField)
    this.setState({ movie: editedMovie })
  }

  render () {
    const { updated, title, starring, runtime, description } = this.state
    if (updated) {
      return <Redirect to={'/'} />
    }

    return (
      <Form className="form" onSubmit={this.handleUpdate}>
        <h2>Update Movie</h2>
        <Form.Group controlId="movieTitle">
          <Form.Label>Movie Title</Form.Label>
          <Form.Control
            type="string"
            value={title}
            name="title"
            required
            onChange={this.handleChange}
            placeholder= {this.state.movie.title}
          />
        </Form.Group>
        <Form.Group controlId="starring">
          <Form.Label>Starring</Form.Label>
          <Form.Control
            type="string"
            value={starring}
            name="starring"
            required
            placeholder={this.state.movie.starring}
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
            placeholder={this.state.movie.runtime}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="string"
            value={description}
            name="description"
            required
            placeholder={this.state.movie.description}
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
      </Form>
    )
  }
}

export default withRouter(UpdateMovie)
