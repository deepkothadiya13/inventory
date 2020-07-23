import React, { Component, useState, Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Route } from 'react-router-dom'

import  CustomersReviewList from './CustomersReviewList';
import  CustomersReviewCreateUpdate  from './CustomersReviewCreateUpdate';
import './App.css';
import List from "./List";

const App = () => {
  const [userInput, setUserInput] = useState("");
  const [list, setList] = useState([]);

  console.log("@@@@@@@@@",userInput)
  // userinput is controlled by the App component
  const handleChange = e => {
    setUserInput(e.target.value);
  };

  const addItem = e => {
    if (userInput !== "") {
      setList([...list, userInput]);
      setUserInput("");
    }
  };

  const removeItem = item => {
    const updatedList = list.filter(listItem => listItem !== item);
    setList(updatedList);
  };

  return (
    <Fragment>
      <List list={list} removeItem={removeItem} />
      <hr />
      
    </Fragment>
  );
}

export default App;