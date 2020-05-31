import React from 'react'
import axios from '../../config/axios'
import '../../styles/Event.css'
import {Link} from 'react-router-dom'

export default class EventList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            events:[]
        }
    }
    componentDidMount(){
        axios.get('/events')
        .then(response=>{
            const events = response.data
            this.setState({
                events
            })
        })
        .catch(error=>{
            console.log(error)
        })
    }
    render(){
        return(
            <div>
            <h2>Upcoming Events</h2>
            <div className="row">
            { this.state.events.map((event,id)=>{
                return(
                        <div className="column" key={id}>
                            <div className="card">
                                <h3><Link to={`/events/${event._id}`}>{event.eventName}</Link></h3>
                                <p>Date : {event.eventDate}</p>
                            </div>
                        </div>
                )
            })}
            </div>
            </div>
        )
    }
}