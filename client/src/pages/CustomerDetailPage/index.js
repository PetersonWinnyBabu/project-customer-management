import {useState,useEffect} from 'react'
import { useParams ,useNavigate, } from 'react-router-dom'
import axios from 'axios'

import AddressList from '../../components/AddressList'
import './index.css'
const CustomerDetailPage = (props) => {
    const [customerDetails, setcustomerDetails] = useState({});
    const {id} = useParams()
    const navigate = useNavigate()
    


    const onClickDelete = () => {
        axios.delete(`https://project-customer-management.onrender.com/api/customers/${id}`)
            .then(response => {
                console.log(response.data.data);
                alert(response.data.message)
                navigate('/',{replace:true})
            })
            .catch(error => {
                console.error('There was an error fetching the customers!', error);
        });
    }

    const onClickEdit = () => {
        navigate(`/update-customer/${id}`)
    }

    const goback = () => {
        navigate(-1)
    }

    const onClickAddNewAddress = () => {
        navigate(`/new-address/${id}`)
    }
    

    useEffect(() => {
        axios.get(`https://project-customer-management.onrender.com/api/customers/${id}`)
            .then(response => {
                setcustomerDetails(response.data.data);
            })
            .catch(error => {
                console.error('There was an error fetching the customers!', error);
            });
    }, []); 

return (
    <div className="background-Container">
        <div className = "header">
                <h1 className='heading'>Customer Details</h1>
                <button className='addCustomer' type = "button" onClick={goback}>Go Back</button>
        </div>
        <div className="biodata">
            <div className='details'>
                <p className='names'><span className='span1'>First Name :</span> {customerDetails.first_name}</p>
                <p className='names'><span className='span1'>Last Name :</span>  {customerDetails.last_name}</p>
                <p className='names'><span className='span1'>Phone : </span>{customerDetails.phone_number}</p>
            </div>
            <div className='buttoncontainer'>            
                <button className='button editButton' onClick = {onClickEdit}>Edit</button>
                <button className='button' onClick = {onClickDelete}>Delete</button>
            </div>

        </div>
        <h1 className='heading'>Addresses List</h1>
        <div className='buttonContainer'>
            <button className='addCustomer' type = "button" onClick={onClickAddNewAddress}>Add New Address</button>
        </div>
        <AddressList />
    </div>
    )
}


export default CustomerDetailPage


