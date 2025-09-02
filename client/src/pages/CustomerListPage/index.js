import React, { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import CustomerList from '../../components/CustomerList';

import './index.css'



const  CustomerListPage = ()  => {
    const [customers, setCustomers] = useState([]);
    const [searchParameter,setsearchParameter] = useState('')
    const [searchField,setsearchField] = useState('')
    const navigate = useNavigate() 
    const sortBy = 'id'

    const url = new URL("http://localhost:5000/api/customers");

    const onClickAddCustomer = () => {
        navigate('/new-customer')

    }

    useEffect(() => {
        
        axios.get('http://localhost:5000/api/customers')
            .then(response => {
                setCustomers(response.data.data);
            })
            .catch(error => {
                console.error('There was an error fetching the customers!', error);
            });
    }, []); 

const makeApiCall = (finalUrl) => {
    axios.get(finalUrl)
        .then(response => {
            setCustomers(response.data.data);
        })
        .catch(error => {
            console.error('There was an error fetching the customers!', error);
        });
}
    
const onSearch = () => {
        if (searchField === "city") {
        url.searchParams.set("city", searchParameter);
        } else if (searchField === "phone_number") {
        url.searchParams.set("phone_number", searchParameter);
        } else if (searchField === "first_name") {
        url.searchParams.set("first_name", searchParameter);
        }
            url.searchParams.set("page", 1)
            url.searchParams.set("limit",10)
            url.searchParams.set("sortBy",sortBy)
            const finalUrl = url.toString();
            console.log(finalUrl)
            makeApiCall(finalUrl)
    }

    const onChangeSelect = (e) => {
        setsearchField(e.target.value)

    }

    return (
        <div className='background-Container'>
            <div className = "header">
                <h1 className='heading'>Customer List</h1>
                <button className='addCustomer' type = "button" onClick = {onClickAddCustomer}>Add Customer</button>
            </div>
            <div className='searchOptions'>
                    <input className = "search" type ="search" placeholder='Search BY' onChange = {(event) => setsearchParameter(event.target.value)} value={searchParameter}/>
                    <button className='searchButton' onClick = {onSearch}>Search</button>
            </div>
            <select className='selection' onChange = {onChangeSelect} value={searchField}>
                <option className='option' value = "city">City</option>
                <option className='option' value = "first_name">First Name</option>
                <option className='option' value = "phone_number">Phone Number</option>
            </select>
        
            <CustomerList customers = {customers}/>

        </div>
    );
}

export default CustomerListPage;