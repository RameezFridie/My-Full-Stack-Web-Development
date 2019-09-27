import React from 'react'
import './Styles/Home.css'
class Home extends React.Component {
    render(){
        return(
            <div>
                <div>
                    <img className="header-image" src="https://1.bp.blogspot.com/-5xyNqP5DiOs/UhsqtOh78ZI/AAAAAAAAAlo/0KMQxRxZZqI/s1600/Logo+iTunes.JPG" alt="itunes"/>
                </div>
                <h1 className="home-h1">Welcome!</h1>
            </div>
        )
    }
}


export default Home