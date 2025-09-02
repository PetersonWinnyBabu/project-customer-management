import { useNavigate } from "react-router-dom"

import CustomerForm from "../../components/CustomerForm"
import './index.css'

const CustomerFormPage = () => {
    const navigate = useNavigate()

    const goback = () => {
        navigate(-1)
    }
    return (
    <div className="form-background-container"> 
    <div className="form-container">
        <button className="backButton" type = "button" onClick = {goback}>Go Back</button>
            <CustomerForm/>
    </div>
    </div>
    )
}

export default CustomerFormPage