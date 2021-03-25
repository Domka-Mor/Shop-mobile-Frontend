import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {ProductConsumer1} from '../context';



export default class BackProductSingle extends React.Component {



  render() {

    const {_id, name, price, inCart, productImage} = this.props.productsAPI;



    return (
      <ProductWrapper className= 'col-9 mx-auto col-m-6 col-lg-3 my-3'>
      {/*takto ziskas udaje z contextu(vyssie), dalsi sposob je v DetailsAPI, vo vnutri return*/}
        <div className= 'card'>
         <ProductConsumer1>
          {context => (
              <div className= 'img-container p-3' 
                onClick={() => 
                  context.handleDetailAPI(_id)
                }>
                <Link to={`/product/${_id}`}>                 
                  {/*<img src={'http://localhost:3000/uploads/1605541890343pool.jpg'} alt='img'/>*/}
                  <img src={`http://localhost:3000/${productImage[0]}`} alt='img' className='img-fluid'/>
                </Link>

                  {context.token ? (      
                      <button className='cart-btn' 
                        disabled= {inCart ? true : false} 
                        onClick={() => {
                          context.openModalAPI(_id);
                          context.addToCartAPI(_id);
                          context.cartUser(_id);
                        }}>                    
                        {inCart? (
                            <p className='text-capitalize mb-0' disabled> in cart </p>
                          ) : (
                            <i className='fas fa-cart-plus'/>
                        )}
                      </button>
                      ) : (     
                      <Link to='/login'>               
                        <button className='cart-btn'>                         
                            <i className='fas fa-cart-plus'/>                       
                        </button>
                      </Link>
                  )}
              </div>
            )}
          </ProductConsumer1>
          {/* card footer */}
          <div className='card-footer d-flex justify-content-between'>
            <p className='align-self-center mb-0'>
              {name}
            </p>
            <h5 className='text-blue font-italic mb-0'>
              <span className='mr-1'>$</span>
              {price}
            </h5>
          </div>
        </div>
      </ProductWrapper>
    );
  }
}





const ProductWrapper = styled.div`
    .card {
      border-color: transparent;
      transition: all 0.5s linear;
    }
    .card-footer {
      background: transparent;
      border-top: transparent;
      transition: all 0.5s linear;
    }
    &:hover {
      .card {
        border: 0.04rem solid rgba(0,0,0,0.2);
        box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.2)
      }
      .card-footer {
        background: rgba(247, 247, 247);
      }
    }
    .img-container {
      position: relative;
      overflow: hidden;
    }
    .card-img-top {
      transition: all 0.5s linear;
    }
    .img-container:hover .card-img-top{
      transform: scale(1.2);
    }
    .cart-btn{
      position: absolute;
      bottom: 0;
      right: 0;
      padding: 0.2rem 0.4rem;
      background: var(--lightBlue);
      border: none;
      color:var(--mainWhite);
      font-size: 1.4rem;
      border-radius: 0.5rem 0 0 0;
      transform: translate(100%, 100%);
      transition: all 0.5s linear;
    }
    .img-container: hover .cart-btn {
      transform: translate(0,0);
    }
    .cart-btn:hover{
      color: var(--mainBlue);
      cursor: pointer;
    }
`;