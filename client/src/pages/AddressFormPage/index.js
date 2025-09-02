import { useNavigate } from 'react-router-dom'
import AddressForm from '../../components/AddressForm'

const AddressFormPage = () => {
    const navigate = useNavigate()

    const goback = () => {
        navigate(-1)
    }
    return (
    <div className="form-background-container"> 
    <div className="form-container">
        <button className="backButton" type = "button" onClick = {goback}>Go Back</button>
            <AddressForm/>
    </div>
    </div>
    )
}

export default AddressFormPage