import React from 'react';
import styled from 'styled-components';
import {ProductContext} from '../context';


export default class Login extends React.Component {

static contextType = ProductContext;

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      email: '',
      password: '',
      name: '',
      surname: '',
      adress: '',
      country: '',
      token: null,
      userId: null,
      cartAPI: []
    }
  }



  openModal = (event) => {
    this.setState({modal: true})
  }


  closeModal = (event) => {
    this.setState({modal: false})
  }


  onEmailChange = (event) => {
    this.setState({email: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({password: event.target.value})
  }


  onNameChange = (event) => {
    this.setState({name: event.target.value})
  }

  onSurnameChange = (event) => {
    this.setState({surname: event.target.value})
  }

  onAdressChange = (event) => {
    this.setState({adress: event.target.value})
  }

  onCountryChange = (event) => {
    this.setState({country: event.target.value})
  }

  
  onSubmitSignUp = (event) => {
     event.preventDefault();
    fetch('http://localhost:3000/user/signup', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name,
        surname: this.state.surname,
        adress: this.state.adress,
        country: this.state.country
      }) 
    })
    .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
    })
    .then(resData => {
        this.closeModal();
        console.log('registrovany');    
    })
    .catch(err => {
        console.log(err);
    });
  }

 onSubmitLogIn = (event) => {
     event.preventDefault();
    fetch('http://localhost:3000/user/login', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password
        }) 
    })
    .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
    })
    .then(resData => {
         if (resData.userId) {
          this.context.user(
            resData.userId
          );
        }
        if (resData.token) {
          this.context.login(
            resData.token
          );
          this.props.history.push('/')
        }
        if (resData.role) {
          this.context.setRole(
            resData.role
          );
          this.props.history.push('/')
        }
        if (resData.cart) {
          this.context.setCart(
            resData.cart
          );
        }
  // pouzivam static context type, ale musim vlozit celkovy context, nie consumer, ani provider, 
  //inak by som musela cez consumer odkazovat na prihlasenie      
        this.context.fetchProducts(); 
        this.context.showAdress();
        console.log('prihlaseny');
    })
    .catch(err => {
        console.log(err);
    });
  } 

  render() {
    return (
      <div className="container login">
        <div className='col-8 mx-auto col-md-6 col-lg-4 pt-5'>
          <form>
            <div className="form-group pt-5">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input 
              type="email" 
              className="form-control" 
              id="exampleInputEmail" 
              aria-describedby="emailHelp" 
              placeholder="Enter email"
              onChange={this.onEmailChange}
              />
            </div>
            <div className="form-group pt-3">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input 
              type="password" 
              className="form-control" 
              id="exampleInputPassword" 
              placeholder="Password"
              onChange={this.onPasswordChange}
              />
            </div>
            <div className= 'text-center text-capitalize pt-3'>
              <button 
              type="submit" 
              className="btn btn-primary"
              onClick = {this.onSubmitLogIn}
              >Login
              </button>
            </div>
          </form>

          <div className= 'text-center text-capitalize pt-5'>
            <h4>don't have an account?</h4>    
          </div>
          <div className= 'text-center text-capitalize pt-3'>
             <button 
              type="submit" 
              className="btn btn-primary"
              onClick={() => 
              this.openModal()}
              >Signup
              </button>
          </div>

          {this.state.modal && (
            <ModalContainer>
            <div className='container'>
            <div className='row'>
            <div id='modal' className='signup col-8 mx-auto col-md-6 col-lg-4 text-center text-capitalize p-5'>

          <form>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input 
              type="email" 
              className="form-control" 
              id="exampleInputEmail1" 
              aria-describedby="emailHelp" 
              placeholder="Enter email"
              onChange={this.onEmailChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input 
              type="password" 
              className="form-control" 
              id="exampleInputPassword1" 
              placeholder="Password"
              onChange={this.onPasswordChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="fname">name</label>
              <input 
              type="text" 
              className="form-control" 
              id="name" 
              placeholder="Enter your name"
              onChange={this.onNameChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lname">surname</label>
              <input 
              type="text" 
              className="form-control" 
              id="surname" 
              placeholder="Enter your surname"
              onChange={this.onSurnameChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">address</label>
              <input 
              type="text" 
              className="form-control" 
              id="address" 
              placeholder="Enter your address"
              onChange={this.onAdressChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="country">country</label>
              <input 
              type="text" 
              className="form-control" 
              id="country" 
              placeholder="Enter your country"
              onChange={this.onCountryChange}
              />
            </div>
            <div className="buttons">
              <button 
              type="button" 
              className="btn btn-primary m-4"
              onClick={() => 
              this.closeModal()}
              >Close
              </button>
              <button 
              type="submit" 
              className="btn btn-primary m-4"
              onClick = {this.onSubmitSignUp}
              >Signup
              </button>
            </div>
          </form>

          </div>
            </div>
          </div>
          </ModalContainer>
          )}
        </div>
      </div>
    )
  }
}



const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
    #modal{
      background: var(--mainWhite);
    }
  @media (max-width: 500px){
    .p-5{
     padding: 0.7rem 2rem 0rem 2rem !important;
    }
    .m-4{
     margin: 1rem !important;
    }
    .buttons{
      display: flex;
      align-items: left;
      justify-content: center;
    }
}
`;