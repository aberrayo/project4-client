import React, { Component, Fragment } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'
import apiUrl from '../apiConfig'
import Button from 'react-bootstrap/Button'
class Movies extends Component {
  constructor () {
    super()

    this.state = {
      movies: [],
      edit: false
    }
  }

  componentDidMount () {
    axios(`${apiUrl}/movies`)
      .then(res => {
        this.setState({ movies: res.data.movies })
      })
    // this.props.alert('Whoops! Failed to add your movie. Please try again.', 'danger')
  }

 handleDelete = (_id) => {
   axios({
     url: `${apiUrl}/movies/${_id}`,
     method: 'DELETE',
     headers: {
       'Authorization': `Token token=${this.props.user.token}`
     }
   })
     .then(() => {
       axios(`${apiUrl}/movies`)
         .then(res => {
           this.setState({ movies: res.data.movies })
         })
         .then(() => this.props.alert('Has been deleted!', 'success'))
         .catch(() => this.props.alert('Unable to Delete!', 'failure'))
     })
 }
 render () {
   const { user } = this.props
   const { movies } = this.state
   return (
     <Fragment>
       <div className="d-flex justify-content-between align-items-center py-3">
         {!user && <h5 className="m-0">
        Sign In to See<span className="o"> Movie</span> Collection
         </h5>}
         {!user && <h4 className="m-0">
           <div className="title">
             <span className="l">M</span>
             <span className="o">O</span>
             <span className="c">v</span>
             <span className="u">I</span>
             <span className="s">E</span>
             <span className="s">S</span>
           </div>
         </h4>}
         {user && <Button variant="success" href="#create-movie">Add A Movie</Button>}
       </div>
       <ListGroup>
         { user && movies.map(movie => (
           <ListGroup.Item key={movie._id} className= "content">
             <span className="h5 d-block"><strong>Title:</strong> <h6> {movie.title}</h6></span>
             <span className="h5 d-block"><strong>Starring:</strong>  <h6>{movie.starring}</h6></span>
             <span className="h5 d-block"><strong>Runtime</strong>  <h6>{movie.runtime} Minutes</h6></span>
             <span className="h5 d-block"><strong> Description</strong>  <h6>{movie.description}</h6></span>
             <Button variant="danger" onClick={() => this.handleDelete(movie._id)}>Delete Movie</Button>  <Link to={ '/movies/' + movie._id }><Button variant="success">Update A Movie</Button></Link>
           </ListGroup.Item>
         )) }
       </ListGroup>
     </Fragment>
   )
 }
}

export default Movies
