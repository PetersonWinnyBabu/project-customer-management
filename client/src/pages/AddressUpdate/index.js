import {useState} from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from 'axios'


const AddressUpdatePage = () => {
    const [addressDetails,setaddressDetails] = useState('')
    const [city,setCity] = useState('')
    const [state,setState] = useState('')
    const [pinCode,setpinCode] = useState('')
    const {addressId} = useParams()
    const navigate = useNavigate()


const  onFormSubmit = (event) => { 
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
    axios.put(`https://api-project-customer-management.onrender.com/api/addresses/${addressId}`,body)
        .then(response => {
            alert(response.data.message);
            navigate(-1)
        })
        .catch(error => {
            console.error('There was an error fetching the customers!', error);
        });
    setaddressDetails("")
    setCity('')
    setState('')
    setpinCode('')
}

    const goback = () => {
        navigate(-1)
    }

    return (
    <div className="form-background-container"> 
        <div className="form-container">
            <button className="backButton" type = "button" onClick = {goback}>Go Back</button>
            <form className="customer-form" onSubmit = {onFormSubmit}>
                <div className="input-container">
                    <label className="name-label" htmlFor = "addressDetails">Address Details</label>
                    <input className="name-input" id = "addressDetails" type = "text" value = {addressDetails} onChange = {(e) => {setaddressDetails(e.target.value)}} />
                </div>
                <div className="input-container">
                    <label className="name-label" htmlFor = "cityInput">City</label>
                    <input className="name-input" id = "cityInput" type = "text" value = {city} onChange = {(e) => {setCity(e.target.value)}} />
                </div>
                <div className="input-container">
                    <label className="name-label" htmlFor = "stateInput">State</label>
                    <input className="name-input" id = "stateInput" type = "text" value = {state} onChange = {(e) => {setState(e.target.value)}} />
                </div>
                <div className="input-container">
                    <label className="name-label" htmlFor = "pinCodeInput">Pin Code</label>
                    <input className="name-input" id = "pinCodeInput" type = "text" value = {pinCode} onChange = {(e) => {setpinCode(e.target.value)}} />
                </div>
                <button className="button-36" type="submit">Submit</button>
            </form>
        </div>
    </div>
 
    )
    
}


export default AddressUpdatePage

