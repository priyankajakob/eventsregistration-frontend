import React from 'react'
import axios from '../../config/axios'

import '../../styles/Registration.css'

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
                <div className="registerform">
                    <h2>You have successfully registered for the event</h2>
                    <p>Your Registration Id is : &nbsp; {this.state.registrationId} &nbsp;</p>
                    <p>Total Cost is : &nbsp; {this.state.totalCost}/- Rs &nbsp;</p>
                </div>
            )
        }
        else {
            return(
                <div className="registerform">
                <h2>Here is a Preview of your input for verification</h2>
                <p>Your Full Name is : &nbsp; {this.props.previewData.fullName}&nbsp;</p>
                <p>Your Mobile Number is : &nbsp;  {this.props.previewData.mobile}&nbsp;</p>
                <p>Your Email Id is : &nbsp;  {this.props.previewData.email}&nbsp;</p>
                <p>Your Card No is : &nbsp;  {this.props.previewData.cardNo}&nbsp;</p>
                <p>Registration Type selected is : &nbsp;  {this.props.previewData.registrationType}&nbsp;</p>
                <p>Number of Tickets is : &nbsp;  {this.props.previewData.noOfTickets}&nbsp;</p>
                <button onClick={this.handleSubmit} className="submitbtn">Submit</button>
            </div>
            )
        }
        
    }
}
