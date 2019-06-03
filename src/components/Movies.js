import React, { Component, Fragment } from 'react'
import axios from 'axios'
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
      .catch(console.error)
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
         .catch(console.error)
     })
 }
 render () {
   const { user } = this.props
   const { movies } = this.state
   return (
     <Fragment>
       <div className="d-flex justify-content-between align-items-center py-3">
         <h3 className="m-0"><strong>Movies currently in the Library</strong></h3>
         {!user && <p className="m-0">Sign in to edit movies</p>}
         {user && <Button variant="success" href="#create-movie">Add A Movie</Button>}
       </div>
       <ListGroup>
         { user && movies.map(movie => (
           <ListGroup.Item key={movie._id} className= "content">
             <span className="h5 d-block"><strong className= "unit">Title:</strong> <h4> {movie.title}</h4></span>
             <span className="h5 d-block"><strong className= "unit">Starring:</strong>  <h4>{movie.starring}</h4></span>
             <span className="h5 d-block"> <strong className= "unit">Runtime</strong>  <h4>{movie.runtime} Minutes</h4></span>
             <span className="h5 d-block"><strong className= "unit"> Description</strong>  <h4>{movie.description}</h4></span>
             <Button variant="danger" onClick={() => this.handleDelete(movie._id)}>Delete Movie</Button>
           </ListGroup.Item>
         )) }
         { !user && movies.map(movie => (
           <ListGroup.Item key={movie._id}>
             <span className="h5 d-block">  {movie.title}</span>
             <span>{movie.title}   {movie.starring}</span>
           </ListGroup.Item>
         ))}
       </ListGroup>
     </Fragment>
   )
 }
}

export default Movies
