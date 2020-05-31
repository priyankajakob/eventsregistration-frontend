import React from 'react'
import axios from '../../config/axios'
import moment from 'moment'

export default class Register extends React.Component{
    constructor(props){
        super(props)
        this.state={
            fullName:'',
            mobile:'',
            email:'',
            password:'',
            cardNo:'',
            registrationType:'',
            noOfTickets:'',
            registrationName:'',
            registerFormData:{},
            userFormData:{},
            event:this.props.match.params.eventId,
            registered:false,
            allowedTickets:[1],
            registrationId:'',
            totalCost:0
        }
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        },()=>{
                const allowedTickets=[]
                    let ticketsCount=1
                    switch(this.state.registrationType){
                        case 'Self':ticketsCount=1
                                    break
                        case 'Group':
                                ticketsCount=15
                                break
                        case 'Corporate':
                                ticketsCount=50
                                  break
                        case 'Others':
                                ticketsCount=100
                                break
                        default:
                                ticketsCount=1
                                break
                    }
                    for(let i=1;i<=ticketsCount;i++)
                    allowedTickets.push(i)
                    this.setState({allowedTickets})
        })
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        const userFormData = {
            fullName : this.state.fullName,
            mobile : this.state.mobile,
            email : this.state.email,
            password : this.state.password,
            cardNo : this.state.cardNo,
        }
        //console.log(userFormData)
        
         //after user is created that _id needs to be passed below for register
        axios.post('/users',userFormData)
        .then(response=>{
            console.log(response.data)
            const registerFormData = {
                user:response.data._id,
                event:this.state.event,
                registrationType:this.state.registrationType?this.state.registrationType:'Self',
                noOfTickets:this.state.noOfTickets?this.state.noOfTickets:1,
                registrationName:this.state.registrationName,
                registrationDate:moment().format('DD MMM YYYY')
            }
            //console.log(registerFormData)
            axios.post('/registrations',registerFormData)
            .then(response=>{
                console.log(response.data)
                this.setState({
                    registered:true
                },()=>{
                    this.setState({
                        totalCost : response.data.estimateCost,
                        registrationId: response.data._id
                    })
                })
            })
            .catch(error=>{
                console.log(error)
            })
            
        })
        .catch(error=>{
            console.log(error)
        }) 
    }

    render(){
        if(this.state.registered){
             return(
                 <div>
                     <h3>You have succesfully registered for the event</h3>
                     <p>Your Registration Id is {this.state.registrationId}</p>
                     <p>Total Cost is {this.state.totalCost}</p>
                 </div>
             )
        }
        else {
            return(
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <h3>Registering for the event</h3>
                        <label htmlFor="fullName">Your Full Name</label>
                        <input type="text" id="fullName" name="fullName" value={this.state.fullName} onChange={this.handleChange}/>
                        <br />
                        <label htmlFor="mobile">Your Mobile Number</label>
                        <input type="text" id="mobile" name="mobile" value={this.state.mobile} onChange={this.handleChange}/>
                        <br />
                        <label htmlFor="email">Your Email Id</label>
                        <input type="text" id="email"  name="email" value={this.state.email} onChange={this.handleChange}/>
                        <br />
                        <label htmlFor="password">Input a Password</label>
                        <input type="password" id="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                        <br />
                        <label htmlFor="cardNo">Valid Id Card Number</label>
                        <input type="text" id="cardNo" name="cardNo" value={this.state.cardNo} onChange={this.handleChange}/>
                        <br />
                        <label htmlFor="registrationType">Registation Type</label>
                        <select name="registrationType" id="registrationType" onChange={this.handleChange}>
                            <option value="Self">Self</option>
                            <option value="Group">Group</option>
                            <option value="Corporate">Corporate</option>
                            <option value="Others">Others</option>
                        </select>
                        <br />
                        <label htmlFor="noOfTickets">How Many Tickets You Need?</label>
                        <select name="noOfTickets" id="noOfTickets" onChange={this.handleChange}>
                            {this.state.allowedTickets.map((ele,index)=>{
                                return(
                                    <option value={ele} key={index}>{ele}</option>
                                )
                            })}
                        </select>
                        <br />
                        <label htmlFor="noOfTickets">Registration Name/Passphrase?</label>
                        <input type="text" name="registrationName" value={this.state.registrationName} onChange={this.handleChange}/>
                        <br />
                        <input type="submit" value="Submit"/>
                    </form>
                </div>
            )
        }
       
    }
}