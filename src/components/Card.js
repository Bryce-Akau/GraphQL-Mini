import React, { Component } from 'react'
import DeletePersonMutation from '../components/mutation/mutation'

export default class Card extends Component {
  render() {
    return (
      <div className='card'>
        <h4>Character:</h4>
        <p>{this.props.name}</p>
        <p>{this.props.height}</p>
        <br />
        {/* <h4>Homeworld</h4>
        <p>{this.props.homeWorld.name}</p> */}
        <br />
        <h4>Number of Films</h4>
        <p>{this.props.films.length}</p>
        <br />
        <DeletePersonMutation>
            {( loading, error, deletePerson) => {
                return (
                    <div>
                        <button onClick={() => deletePerson({ variables:{id: this.props.id } })}>
                        Delete
                        </button>
                        {loading && <p> Loading...</p>}
                        {error && <p> is deleted </p>}
                    </div>
                )
            }}
        </DeletePersonMutation>
      </div>
    )
  }
}