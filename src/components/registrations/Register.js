import React from 'react'
import moment from 'moment'
import PreviewComp from '../registrations/Preview'

import '../../styles/Registration.css'

export default class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fullName: '',
            mobile: '',
            email: '',
            password: '',
            cardNo: '',
            registrationType: '',
            noOfTickets: '',
            registrationName: '',
            event: this.props.match.params.eventId,
            allowedTickets: [1],
            registrationId: '',
            totalCost: 0,
            previewClicked: false,
            previewData: {},
            errors:''
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        }, () => {
            const allowedTickets = []
            let ticketsCount = 1
            switch (this.state.registrationType) {
                case 'Self': ticketsCount = 1
                    break
                case 'Group':
                    ticketsCount = 15
                    break
                case 'Corporate':
                    ticketsCount = 50
                    break
                case 'Others':
                    ticketsCount = 100
                    break
                default:
                    ticketsCount = 1
                    break
            }
            for (let i = 1; i <= ticketsCount; i++)
                allowedTickets.push(i)
            this.setState({ allowedTickets })
        })
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        if(this.validateDataEntered()===true){
            this.setState({
                errors:''
            },()=>{
                this.handlepreviewClicked()
            })
            
        }
        
    }

    validateDataEntered=()=>{
         
       const validateMobile = ()=>{
            let invalidChar = false
            for(let i=0;i<this.state.mobile.toString().split("").length;i++){
                if(typeof Number(this.state.mobile.toString().split("")[i])!=='number')
                {
                    invalidChar=true
                    break
                }
            }
            if(invalidChar || this.state.mobile.toString().split("").length!==10){
                //console.log("validations failed")
                this.setState({
                    errors:'Kindly enter valid mobile number'
                },()=>{
                    return false
                })
            }
            
            else{
                //console.log("validations passed")
                return true
            }
       }

     const validateEmail=() => {
           const email = this.state.email
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(re.test(String(email).toLowerCase())){
                //console.log("validations passed")
                return true
            }
            else{
                this.setState({
                    errors:'Kindly enter valid email address'
                },()=>{
                    return false
                })
            }
    }

    const validatePassword=() => {
        const password = this.state.password
        if(password.length<10)
        {
            this.setState({
                errors:'Password minimum length is 10, kindly correct'
            },()=>{
                return false
            })
        }
        else 
        return true
    }

       if(validateMobile() && validateEmail() && validatePassword())
       return true
       else
       return false
    }

    handlepreviewClicked = () => {
        //console.log("came here")
        this.setState({
            previewClicked: true
        }, () => {
            const previewData = {
                fullName: this.state.fullName,
                mobile: this.state.mobile,
                email: this.state.email,
                password: this.state.password,
                cardNo: this.state.cardNo,
                event: this.state.event,
                registrationType: this.state.registrationType ? this.state.registrationType : 'Self',
                noOfTickets: this.state.noOfTickets ? this.state.noOfTickets : 1,
                registrationName: this.state.registrationName,
                registrationDate: moment().format('DD MMM YYYY')

            }
            this.setState({
                previewData
            })
        })
    }
    render() {
        if (this.state.registered) {
            return (
                <div>
                    <h3>You have succesfully registered for the event</h3>
                    <p>Your Registration Id is {this.state.registrationId}</p>
                    <p>Total Cost is {this.state.totalCost}</p>
                </div>
            )
        }
        else if (this.state.previewClicked) {
            return (
               <PreviewComp previewData={this.state.previewData}/>
            )
        }
        else {
            return (
                <div className="registerpagediv">
                    <h2>Stay here and register!</h2>
                    <form className="registerform"onSubmit={this.handleSubmit}>
                        {this.state.errors?(
                        <div>
                            <div style={{color:"red"}}>
                            "{this.state.errors}"
                            </div>
                            <br/>
                        </div>
                        
                        ):""}
                        <label htmlFor="fullName">Your Full Name : &nbsp;</label>
                        <input type="text" id="fullName" name="fullName" value={this.state.fullName} onChange={this.handleChange} required/>
                        <br /><br/>
                        <label htmlFor="mobile">Your Mobile Number : &nbsp;</label>
                        <input type="text" id="mobile" name="mobile" value={this.state.mobile} onChange={this.handleChange} required/>
                        <br /><br/>
                        <label htmlFor="email">Your Email Id : &nbsp;</label>
                        <input type="text" id="email" name="email" value={this.state.email} onChange={this.handleChange} required/>
                        <br /><br/>
                        <label htmlFor="password">Input a Password : &nbsp;</label>
                        <input type="password" id="password" name="password" value={this.state.password} onChange={this.handleChange} required />
                        <br /><br/>
                        <label htmlFor="cardNo">Valid Id Card Number : &nbsp;</label>
                        <input type="text" id="cardNo" name="cardNo" value={this.state.cardNo} onChange={this.handleChange} required/>
                        <br /><br/>
                        <label htmlFor="registrationType">Registation Type : &nbsp;</label>
                        <select name="registrationType" id="registrationType" onChange={this.handleChange}>
                            <option value="Self">Self</option>
                            <option value="Group">Group</option>
                            <option value="Corporate">Corporate</option>
                            <option value="Others">Others</option>
                        </select>
                        <br /><br/>
                        <label htmlFor="noOfTickets">How Many Tickets You Need? : &nbsp;</label>
                        <select name="noOfTickets" id="noOfTickets" onChange={this.handleChange}>
                            {this.state.allowedTickets.map((ele, index) => {
                                return (
                                    <option value={ele} key={index}>{ele}</option>
                                )
                            })}
                        </select>
                        <br /><br/>
                        <label htmlFor="noOfTickets">Registration Name/Passphrase? : &nbsp;</label>
                        <input type="text" name="registrationName" value={this.state.registrationName} onChange={this.handleChange} />
                        <br /><br/>
                        <input type="submit" text="SUBMIT" className="submitbtn"/>
                    </form>
                    {/* <button onClick={this.handlepreviewClicked}>Preview</button> */}
                </div>
            )
        }

    }
}