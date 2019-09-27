/* eslint-disable jsx-a11y/accessible-emoji */

// Import required modules
import React from 'react';
import './Styles/Books.css'

// Class of books that writes to App.js file as component
class Books extends React.Component{
    // Set initial state using a constructor
    constructor(){
        super()
        this.state ={
            data: [],
            bookInput: ''
        }
    }
    // Display books that have been searched for
    newSearch(){
        fetch('/books')
            .then(res => res.json())
            .then(data => this.setState({data}, () => console.log('info fetched...', data)))
    }
    // Params used to search for books
    bookSearch = async () => {
        let search = this.state.bookInput.split(' ').join('+')
        const getBook = await fetch(`/book?search=${search}&type=${this.state.type}`)
        let res = await getBook.json()
        this.setState({
            data: res
        })
        console.log(res);
    }
    // Function that that saves book data in a json file that then writes to a favorites page
    favoriteBook= (i) => {
        let favPic = {
            id: i.trackId,
            artist: i.artistName,
            artwork: i.artworkUrl100,
            track: i.trackName,
            description: i.description
        }
        // Method used to post to json file and thn display
        fetch('/favoritesBooks', {
            method: 'POST',
            headers : {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(favPic)
        })
        alert('Added to favorites')
        console.log(favPic);
    }
    render(){
        return (
            <div>
                <div className="wrap">
                    <h1 className="Title">E-books</h1>
                    <div className="search">
                        <input className='searchTerm' type="text" onChange={(e) => this.setState({bookInput: e.target.value})}/>
                        <button className="searchButton" onClick={() => this.bookSearch()}>🔎</button>
                    </div>
                </div>
                <div className='fieldset'>
                    {/* Display information from json file to the web page or UI */}
                    <fieldset>
                        {this.state.data.map(sort_data => <article key={sort_data.trackId}>
                        <div className="cont">
                            <h3>{sort_data.artistName}</h3>
                            <h3>{sort_data.trackName}</h3>
                        </div>
                        <img src={sort_data.artworkUrl100} alt='bookPic'/>
                        <p>{sort_data.description}</p><br/>
                        <button onClick={() => {this.favoriteBook(sort_data)}}>⭐</button>
                        </article>)}
                    </fieldset>
                </div>
            </div>
        )
    }
}

export default Books