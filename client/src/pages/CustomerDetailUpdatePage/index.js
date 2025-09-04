import { useState} from "react"
import { useNavigate ,useParams} from "react-router-dom"
import axios from 'axios'


const CustomerDetailUpdatePage = () => {
    const [firstName,setfirstName] = useState('')
    const [lastName,setlastName] = useState('')
    const [phoneNumber,setphoneNumber] = useState('')
    const [firstNameError,setfirstNameError] = useState(false)
    const [phoneNumberError,setphoneNumberError] = useState(false)
    const navigate = useNavigate()
    const {id} = useParams()

    const goback = () => {
        navigate(-1)
    }


    const  OnFormSubmit = (event) => { 
        event.preventDefault()
        const body = {
            "first_name": firstName,
            "last_name" : lastName,
            "phone_number" : phoneNumber
        }
        console.log(firstName)
        console.log(lastName)

        if (firstName === "" || phoneNumber === ""){
            alert("please Fill the Empty Fields")
        }
        else{
            axios.put(`http://https://api-project-customer-management.onrender.com/api/customers/${id}`,body)
                .then(response => {
                    alert(`${response.data.message}`);
                    navigate(-1)
                })
                .catch(error => {
                    console.error('There was an error fetching the customers!', error);
        });
     

        setfirstName('')
        setlastName('')
        setphoneNumber('')

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
    <div className="form-background-container"> 
        <div className="form-container">
            <button className="backButton" type = "button" onClick = {goback}>Go Back</button>
            <form className="customer-form" onSubmit = {OnFormSubmit}>
                <div className="input-container">
                    <label className="name-label" htmlFor = "firstNameInput">FIRST NAME</label>
                    <input className="name-input" id = "firstNameInput" type = "text"  value = {firstName} onChange = {(e) => {setfirstName(e.target.value)}} onBlur = {onBlurFirstName}/>
                    {firstNameError && <p className="response-msg">First Name cannot be Empty </p>}
                </div>
                <div className="input-container">
                    <label className="name-label" htmlFor = "lastNameInput">LAST NAME</label>
                    <input className="name-input" id = "lastNameInput" type = "text"  value = {lastName} onChange = {(e) => {setlastName(e.target.value)}} />
                </div>
                <div className="input-container">
                    <label className="name-label" htmlFor = "phoneInput">PHONE NUMBER</label>
                    <input className="name-input" id = "phoneInput" type = "text" value = {phoneNumber}  onChange = {(e) => {setphoneNumber(e.target.value)}} onBlur={onBlurPhoneNumber} />
                    {phoneNumberError && <p className="response-msg">Phone Number cannot be Empty and must be 10 Characters</p>}
                </div>

                <button className="button-36" type="submit">Submit</button>
            </form>
        </div>
    </div>
 
    )
}


export default CustomerDetailUpdatePage
