import React from 'react'
import axios from '../../config/axios'

export default class PreviewComp extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            registerFormData: {},
            userFormData: {},
            registered: false,
            previewData:{},
            registrationId: '',
            totalCost: 0,
        }
    }
    handleSubmit=()=>{
        const previewData = this.props.previewData
        this.setState({
            previewData
        },()=>{
            //console.log(this.state.previewData)

            const userFormData = {
                fullName: this.state.previewData.fullName,
                mobile: this.state.previewData.mobile,
                email: this.state.previewData.email,
                password: this.state.previewData.password,
                cardNo: this.state.previewData.cardNo
            }
            //console.log(userFormData)
    
            //after user is created that _id needs to be passed below for register
            axios.post('/users', userFormData)
                .then(response => {
                    console.log(response.data)
                    const registerFormData = {
                        user: response.data._id,
                        event: this.state.previewData.event,
                        registrationType: this.state.previewData.registrationType,
                        noOfTickets: this.state.previewData.noOfTickets,
                        registrationName: this.state.previewData.registrationName,
                        registrationDate: this.state.previewData.registrationDate
                    }
                    //console.log(registerFormData)
                    axios.post('/registrations', registerFormData)
                        .then(response => {
                            console.log(response.data)
                            this.setState({
                                registered: true
                            }, () => {
                                this.setState({
                                    totalCost: response.data.estimateCost,
                                    registrationId: response.data._id
                                }) 
                            })
                        })
                        .catch(error => {
                            console.log(error)
                        })
    
                })
                .catch(error => {
                    console.log(error)
                })
        })
       
    }
    render(){
        if (this.state.registered) {
            return (
                <div>
                    <h3>You have successfully registered for the event</h3>
                    <p>Your Registration Id is {this.state.registrationId}</p>
                    <p>Total Cost is {this.state.totalCost}</p>
                </div>
            )
        }
        else {
            return(
                <div>
                <h3>Here is a Preview of your input for verification</h3>
                <p>Your Full Name is {this.props.previewData.fullName}</p>
                <p>Your Mobile Number is {this.props.previewData.mobile}</p>
                <p>Your Email Id is {this.props.previewData.email}</p>
                <p>Your Card No is {this.props.previewData.cardNo}</p>
                <p>Registration Type selected is {this.props.previewData.registrationType}</p>
                <p>Number of Tickets is {this.props.previewData.noOfTickets}</p>
                <button onClick={this.handleSubmit}>Submit</button>
            </div>
            )
        }
        
    }
}
