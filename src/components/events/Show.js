import React from 'react'
import axios from '../../config/axios'
import {Link} from 'react-router-dom'

export default class EventShow extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            event : {}
        }
    }
    componentDidMount(){
        const eventId = this.props.match.params.eventId
        axios.get(`/events/${eventId}`)
        .then(response=>{
            const event = response.data
            this.setState({event})
        })
        .catch(err=>{
            console.log(err)
        })
    }
    render(){
        return(
            <div>
                <h3>{this.state.event.eventName}</h3>
                <p>Date : {this.state.event.eventDate}</p>
                <p>Location : {this.state.event.eventPlace}</p>
                <p>Ticket Cost : //{this.state.event.ticketCost} pax//</p>
                <Link to={`/events/${this.state.event._id}/register`}>Register for this event</Link>
            </div>
        )
    }
}
