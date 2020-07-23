// List.js

import React, { useState, useEffect, Fragment } from "react";
import CustomersReviewList  from './CustomersReviewList';

import  CustomersService  from  './CustomersService';

const  customersService  =  new  CustomersService();


const List = ({ list, removeItem }) => {
    const [filtered, setFiltered] = useState([]);
    useEffect(() => {
        setFiltered(list);
    }, [list]);

    
    const handleChange=(e)=>{ 
        setFiltered(
        customersService.getSearch(e.target.value).then(function(result) {
            console.log(result[0],"success result")
            return result}))   
        }
    // this is the output from search query but i am unable to bring it to <tbody>
    const newlist= Promise.resolve(filtered).then(res=>{
        // console.log(res,"hell")
        res.map(c=>console.log(c))
        // return res
    })
   
    return (
        <Fragment>
        <input 
            type="text" 
            placeholder="Search..." 
            onChange={handleChange} 
        />
        <ul>
        <div  className="customers--review--list">
                <table  className="table">
                <thead  key="thead">
                <tr>
                    <th>#</th>
                    <th>Product ID</th>
                    <th>User ID</th>
                    <th>Profile Name</th>
                    <th>helpfulness</th>
                    <th>score</th>
                    <th>time</th>
                    <th>summary</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {/* please comment this portion and check the console all results are coming */}
                {Promise.resolve(filtered).then(res=>{
                res.map(c=><tr key={c.pk}>
                    <td>{c.pk}  </td>
                    <td>{c.productId}</td>
                    <td>{c.userID}</td>
                    <td>{c.profileName}</td>
                    <td>{c.helpfulness}</td>
                    <td>{c.score}</td>
                    <td>{c.time}</td>
                    <td>{c.summary}</td>
                </tr>)
                })}
                </tbody>
                </table>
                </div>
        </ul>
        </Fragment>
    );
};

export default List;