import { useNavigate } from "react-router-dom"
import axios from 'axios'

import './index.css'

const AddressListItem = (props) => {
    const {itemDetails} = props
    const {id,address_details,city,state,pin_code} = itemDetails
    const navigate = useNavigate()


    const onEditAddress = () => {
        navigate(`/update-address/${id}`)
    }

    const onclickDelete = () => {
        axios.delete(`http://https://api-project-customer-management.onrender.com/api/addresses/${id}`)
            .then(response => {
                console.log(response.data.data);
                alert(response.data.message)
                window.location.reload()
            })
            .catch(error => {
                console.error('There was an error fetching the customers!', error);
        });
    }

    return (
    <li key = {id} className='address-Item'>
        <div className="details-container">
            <p className='names'><span className='span-Item'>Address : </span>{address_details}</p>
            <p className='names'><span className='span-Item'>City : </span>{city}</p>
            <p className='names'><span className='span-Item'>State : </span>{state}</p>
            <p className='names'><span className='span-Item'>PinCode : </span>{pin_code}</p>
        </div>
        <div className="buttons-container">
            <button className="address-edit-button" onClick = {onEditAddress}>Edit</button>
            <button className="address-delete-button" onClick={onclickDelete}>Delete</button>
        </div>
    </li>)
}


export default AddressListItem
