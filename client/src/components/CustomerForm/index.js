import {useState} from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'

import './index.css'


const CustomerForm = () => {
    const [firstName,setfirstName] = useState('')
    const [lastName,setlastName] = useState('')
    const [phoneNumber,setphoneNumber] = useState('')
    const [firstNameError,setfirstNameError] = useState(false)
    const [phoneNumberError,setphoneNumberError] = useState(false)
    const [responseMessage,setresponseMessage] = useState('')
    const navigate = useNavigate()


const  OnFormSubmit = (event) => { 
    event.preventDefault()
    const body = {
        "first_name": firstName,
        "last_name" : lastName,
        "phone_number" : phoneNumber
    }
    console.log(firstName)
    console.log(lastName)

    if (firstNameError === false && phoneNumberError === false){
        axios.post('https://api-project-customer-management.onrender.com/api/customers',body)
        .then(response => {
            alert(response.data.message);
            navigate(-1)
        })
        .catch(error => {
            setresponseMessage(error.response.data.message)
            console.error('There was an error fetching the customers!', error);
        });

        setfirstName('')
        setlastName('')
        setphoneNumber('')
    } else{
        alert('Please Fill the Empty Fields')
    }

}

const onBlurFirstName = () => {
    if (firstName === ""){
        setfirstNameError(true)
    }else{
        setfirstNameError(false)
    }
}

const onBlurPhoneNumber = () => {
    if(phoneNumber === "" || phoneNumber.length <= 9 || phoneNumber.length > 10){
        setphoneNumberError(true)
    }else{
        setphoneNumberError(false)
    }
}
 
    return (
            <form className="customer-form" onSubmit = {OnFormSubmit}>
                <div className="input-container">
                    <label className="name-label" htmlFor = "firstNameInput">FIRST NAME</label>
                    <input className="name-input" id = "firstNameInput" type = "text" value = {firstName} onChange = {(e) => {setfirstName(e.target.value)}} onBlur = {onBlurFirstName}/>
                    {firstNameError && <p className="response-msg">First Name cannot be Empty </p>}
                </div>
                <div className="input-container">
                    <label className="name-label" htmlFor = "lastNameInput">LAST NAME</label>
                    <input className="name-input" id = "lastNameInput" type = "text" value = {lastName} onChange = {(e) => {setlastName(e.target.value)}} />
                </div>
                <div className="input-container">
                    <label className="name-label" htmlFor = "phoneInput">PHONE NUMBER</label>
                    <input className="name-input" id = "phoneInput" type = "text" value = {phoneNumber} onChange = {(e) => {setphoneNumber(e.target.value)}} onBlur={onBlurPhoneNumber} />
                    {phoneNumberError && <p className="response-msg">Phone Number cannot be Empty and must be 10 Characters</p>}
                </div>

                <button className="button-36" type="submit">Submit</button>
                <p className="response-msg">{responseMessage}</p>
            </form>
 
    )
}


export default CustomerForm

