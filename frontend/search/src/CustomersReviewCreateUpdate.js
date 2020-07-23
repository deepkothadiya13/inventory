import React, { Component } from 'react';
import CustomersService from './CustomersService';

const customersService = new CustomersService();

class CustomerReviewCreateUpdate extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
      }

      componentDidMount(){
        const { match: { params } } = this.props;
        if(params && params.pk)
        {
          customersService.getReview(params.pk).then((c)=>{
            this.refs.productId.value = c.productId;
            this.refs.userID.value = c.userID;
            this.refs.profileName.value = c.profileName;
            this.refs.helpfulness.value = c.helpfulness;
            this.refs.score.value = c.score;
            this.refs.time.value = c.time;
            this.refs.summary.value = c.summary;
          })
        }
      }

      handleCreate(){
        customersService.createReview(
          {
            "productId": this.refs.productId.value,
            "userID": this.refs.userID.value,
            "profileName": this.refs.profileName.value,
            "helpfulness": this.refs.helpfulness.value,
            "score": this.refs.score.value,
            "time": this.refs.time.value,
            "summary": this.refs.summary.value
        }
        ).then((result)=>{
          alert("Customer Review created!");
        }).catch(()=>{
          alert('There was an error! Please re-check your form.');
        });
      }
      handleUpdate(pk){
        customersService.updateReview(
          {
            "pk": pk,
            "productId": this.refs.productId.value,
            "userID": this.refs.userID.value,
            "profileName": this.refs.profileName.value,
            "helpfulness": this.refs.helpfulness.value,
            "score": this.refs.score.value,
            "time": this.refs.time.value,
            "summary": this.refs.summary.value
        }
        ).then((result)=>{
          console.log(result);
          alert("Customer Review updated!");
        }).catch(()=>{
          alert('There was an error! Please re-check your form.');
        });
      }
      handleSubmit(event) {
        const { match: { params } } = this.props;

        if(params && params.pk){
          this.handleUpdate(params.pk);
        }
        else
        {
          this.handleCreate();
        }

        event.preventDefault();
      }

      render() {
        return (
          <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>
              ProductId:</label>
              <input className="form-control" type="text" ref='productId' />

            <label>
              UserID:</label>
              <input className="form-control" type="text" ref='userID'/>

            <label>
              Profile Name:</label>
              <input className="form-control" type="text" ref='profileName' />

            <label>
              Helpfulness:</label>
              <input className="form-control" type="text" ref='helpfulness' />

            <label>
              Score:</label>
              <input className="form-control" type="text" ref='score' />

            <label>
              Time:</label>
              <input className="form-control" type="text" ref='time' />
              
            <label>
              Summary:</label>
              <input className="form-control" type="text" ref='summary' />
              {/* <textarea className="form-control" ref='description' ></textarea> */}


            <input className="btn btn-primary" type="submit" value="Submit" />
            </div>
          </form>
        );
      }
}

export default CustomerReviewCreateUpdate;