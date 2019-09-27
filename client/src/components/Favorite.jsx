/* eslint-disable jsx-a11y/accessible-emoji */

// Import react modules
import React from 'react';
import './Styles/Favorite.css'

// Class of music used ton interact with back end and App.js file
class Favorite extends React.Component {
    // Set initial state as an empty array
    constructor(){
        super()
        this.state = {
            favMusic: [],
            favBooks: []
        }
    }
    // mount or fetch data from json files and push info into the empty array
    componentDidMount(){
        fetch('/favoritesMusic')
            .then(res => res.json())
            .then(music => this.setState({favMusic: music}, () => console.log('fetched...', music)))

            fetch('/favoritesBooks')
            .then(res => res.json())
            .then(books => this.setState({favBooks: books}, () => console.log('fetched...', books)))
    }
// Used to delete items form array
    deleteMusic = (i) => {
        let musicToDelete = {
            deleted: i.id
        }
        fetch('/favoritesMusic', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(musicToDelete)
        })
        document.location.reload()
    }
// Used to delete items form array
    deleteBooks = (i) => {
        let booksToDelete = {
            deleted: i.id
        }
        fetch('/favoritesBooks', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(booksToDelete)
        })
        document.location.reload()
    }
    render(){
        return(
            <div>
                <fieldset>
                    <h1>Music</h1>
                    {/* Display saved music */}
                    {this.state.favMusic.map(favM => <article key={favM.artwork}>
                        <div className="cont">
                            <h3>{favM.artist}</h3>
                            <h3>{favM.trackId}</h3>
                        </div>
                        <img className="audio" src={favM.artwork} alt='artwork'/><br/>
                        <audio controls><source src={favM.sample}/></audio>
                        <p>{favM.track}</p>
                        <button className='delete' onClick={() => {this.deleteMusic(favM)}}>🗑️</button>

                    </article>)}
                </fieldset>

                <fieldset>
                    <h1>Books</h1>
                    {/* Display saved books */}
                    {this.state.favBooks.map(favB => <article key={favB.artwork}>
                        <div className="cont">
                            <h3>{favB.artist}</h3>
                            <h3>{favB.track}</h3>
                        </div>
                        <img src={favB.artwork} alt='artwork'/><br/>
                        <p>{favB.description}</p>
                        <button className='delete' onClick={() => {this.deleteBooks(favB)}}>🗑️</button>

                    </article>)}
                </fieldset>
            </div>
        )
    }
}

export default Favorite