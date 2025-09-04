import {useState} from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from 'axios'

import './index.css'


const AddressForm = () => {
    const [addressDetails,setaddressDetails] = useState('')
    const [city,setCity] = useState('')
    const [state,setState] = useState('')
    const [pinCode,setpinCode] = useState('')
    const [responseMessage,setresponseMessage] = useState('')
    const {id} = useParams()
    const navigate = useNavigate()



const  OnFormSubmit = (event) => { 
    event.preventDefault()
    const body = {
        "address_details": addressDetails,
        "city" : city,
        "state" : state,
        "pin_code" : pinCode
    }
    console.log(addressDetails)
    console.log(city)
        // Fetch customers from the backend API
    axios.post(`https://project-customer-management.onrender.com/api/customers/${id}/addresses`,body)
        .then(response => {
            setresponseMessage(response.data.message);
            navigate(-1)
        })
        .catch(error => {
            setresponseMessage(error.response.data.message)
            console.error('There was an error fetching the customers!', error);
        });
    setaddressDetails("")
    setCity('')
    setState('')
    setpinCode('')
}

    return (
            <form className="customer-form" onSubmit = {OnFormSubmit}>
                <div className="input-container">
                    <label className="name-label" htmlFor = "firstNameInput">Address Details</label>
                    <input className="name-input" id = "firstNameInput" type = "text" value = {addressDetails} onChange = {(e) => {setaddressDetails(e.target.value)}} />
                </div>
                <div className="input-container">
                    <label className="name-label" htmlFor = "lastNameInput">City</label>
                    <input className="name-input" id = "lastNameInput" type = "text" value = {city} onChange = {(e) => {setCity(e.target.value)}} />
                </div>
                <div className="input-container">
                    <label className="name-label" htmlFor = "phoneInput">State</label>
                    <input className="name-input" id = "phoneInput" type = "text" value = {state} onChange = {(e) => {setState(e.target.value)}} />
                </div>
                <div className="input-container">
                    <label className="name-label" htmlFor = "pinCodeInput">Pin Code</label>
                    <input className="name-input" id = "pinCodeInput" type = "text" value = {pinCode} onChange = {(e) => {setpinCode(e.target.value)}} />
                </div>
                <button className="button-36" type="submit">Submit</button>
                <p className="response-msg">{responseMessage}</p>
            </form>
 
    )
}


export default AddressForm


