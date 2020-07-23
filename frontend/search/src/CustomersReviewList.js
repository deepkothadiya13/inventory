import  React, { Component } from  'react';
import  CustomersService  from  './CustomersService';

const  customersService  =  new  CustomersService();

class  CustomersReviewList  extends  Component {

    constructor(props) {
        super(props);
        this.state  = {
            reviews: [],
            nextPageURL:  ''
        };
        this.nextPage  =  this.nextPage.bind(this);
        this.handleDelete  =  this.handleDelete.bind(this);
    }

    componentDidMount() {
        var  self  =  this;
        customersService.getReviews().then(function (result) {
            console.log(result,"check result");
            self.setState({ reviews:  result.data, nextPageURL:  result.nextlink})
        });
    }
    handleDelete(e,pk){
        var  self  =  this;
        customersService.deleteReview({pk :  pk}).then(()=>{
            var  newArr  =  self.state.reviews.filter(function(obj) {
                return  obj.pk  !==  pk;
            });

            self.setState({reviews:  newArr})
        });
    }

    nextPage(){
        var  self  =  this;
        console.log(this.state.nextPageURL);
        customersService.getReviewsByURL(this.state.nextPageURL).then((result) => {
            self.setState({ reviews:  result.data, nextPageURL:  result.nextlink})
        });
    }
    render() {

        return (
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
                {this.state.reviews.map( c  =>
                    <tr  key={c.pk}>
                    <td>{c.pk}  </td>
                    <td>{c.productId}</td>
                    <td>{c.userID}</td>
                    <td>{c.profileName}</td>
                    <td>{c.helpfulness}</td>
                    <td>{c.score}</td>
                    <td>{c.time}</td>
                    <td>{c.summary}</td>
                    <td>
                    <button  onClick={(e)=>  this.handleDelete(e,c.pk) }> Delete</button>
                    <a  href={"/review/" + c.pk}> Update</a>
                    </td>
                </tr>)}
                </tbody>
                </table>
                <button  className="btn btn-primary"  onClick=  {  this.nextPage  }>Next</button>
            </div>
            );
    }
}
export  default  CustomersReviewList;