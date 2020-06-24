import React, {Component} from "react";
import axios from 'axios';
import AlertDialog from './Alert'

export default class Form extends Component{

  constructor(props) {
    super(props)

    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeDetails = this.onChangeDetails.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
        city: '',
        location: '',
        details: ''
    }};


handleClose(){
  this.setState({open: false})
}

onChangeCity(e) {
    this.setState({ city: e.target.value })
}

onChangeLocation(e) {
    this.setState({ location: e.target.value })
}

onChangeDetails(e) {
  this.setState({ details: e.target.value })
}

onSubmit(e) {
    e.preventDefault()

    const userObject = {
        city: this.state.city,
        location: this.state.location,
        details: this.state.details
    };

    axios.post('https://cognito1.herokuapp.com/users/create', userObject)
        .then((res) => {
            console.log(res.data)
            alert('Report Submitted Succesfully!!')
            
        }).catch((error) => {
            console.log(error)
        });

    this.setState({ city: '', location: '', details: '' })
}


  render(){
    return (<div><form onSubmit={this.onSubmit} className='column justify-content-center' action='/' method='post'>  
  <div className="form-group">
    <small id="emailHelp" className="form-text text-muted">Enter name of city/town below</small>
    <input type="text" required='true' value={this.state.city} onChange={this.onChangeCity} className="form-control" id="city" placeholder='eg. Kumasi'></input>
  </div>
  <div className="form-group">
    <small id="emailHelp" className="form-text text-muted">Enter precise location(suburb/community</small>
    <input required='true' type="text" value={this.state.location} onChange={this.onChangeLocation} className="form-control" id="location" placeholder='eg. Asokwa, Zongo'></input>
  </div>
  <div className="form-group">
    <small id="emailHelp" className="form-text text-muted">Provide details</small>
    <textarea required='true' className="form-control" value={this.state.details} onChange={this.onChangeDetails} id="details" rows="3" placeholder='eg. 6 year old boy(s) or girl(s) extensively used for fishing activities. Mr. Azigiza house'></textarea>
  </div>
  <div className="form-group form-check">
    {/* <input type="checkbox" class="form-check-input" id="exampleCheck1"></input> */}
    <small id="emailHelp" className="form-text text-muted">Your report will be sent anonymously.</small>
    {/* <label class="form-check-label" for="exampleCheck1">Click here to</label> */}
  </div>
  <button name ='submit' type="submit" className="btn btn-primary" value="Create User">Submit</button>
</form> <AlertDialog /></div>)
  }
};