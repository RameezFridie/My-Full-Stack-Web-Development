// Import react modules
import React from 'react'
import './Styles/Music.css'

// Class of music used ton interact with back end and App.js file
class Music extends React.Component{
    // Set initial state using a constructor
    constructor(){
        super()
        this.state ={
            data: [],
            musicInput: ''
        }
    }
    // Display music that have been searched for
    newSearch(){
        fetch('/music')
            .then(res => res.json())
            .then(data => this.setState({data}, () => console.log('info fetched...', data)))
    }
    // Params used to search for books
    musicSearch = async () => {
        let search = this.state.musicInput.split(' ').join('+')
        const getMusic = await fetch(`/music?search=${search}&type=${this.state.type}`)
        let res = await getMusic.json()
        this.setState({
            data: res
        })
    }
      // Function that that saves book data in a json file that then writes to a favorites page
    favoriteMusic= (i) => {
        let favPic = {
            id: i.trackId,
            artist: i.artistName,
            artwork: i.artworkUrl100,
            track: i.trackName,
            sample: i.previewUrl
        }
        // Method used to post to json file and thn display
        fetch('/favoritesMusic', {
            method: 'POST',
            headers : {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(favPic)
        })
        alert('Added to favorites')
    }
    render(){
        return (
            <div>
                <div className='wrap'>
                    <h1 className="Title">iTunes</h1>
                    <div className='search'>
                        <input className='searchTerm' type="text" onChange={(e) => this.setState({musicInput: e.target.value})}/>
                        <button className="searchButton" onClick={() => this.musicSearch()}>
                        <i className="fa fa-search">🔎</i>
                        </button>
                    </div>
                </div>

                <fieldset>
                    {/* Display information from json file to the web page or UI */}
                    {this.state.data.map(sort_data => <article key={sort_data.trackId}>
                    <div className="cont">
                        <h3>{sort_data.artistName}</h3>
                        <h3>{sort_data.trackName}</h3>
                    </div>
                    <img src={sort_data.artworkUrl100} alt={sort_data.trackId}/>
                    <br/>
                    <audio className="audio" controls>
                        <source src={sort_data.previewUrl}type='audio/mpeg'></source>
                    </audio>
                    <button onClick={() =>this.favoriteMusic(sort_data)}>⭐</button>
                    <hr/>
                    </article>)}

                </fieldset>
            </div>
        )
    }
}

export default Music