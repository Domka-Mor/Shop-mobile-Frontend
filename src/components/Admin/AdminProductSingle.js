import React from 'react';
import styled from 'styled-components';
import {ProductContext} from '../../context';

export default class BackProductSingle extends React.Component {

  static contextType = ProductContext;

  render() {

    const {_id, name, price, company, info, productImage, featured, featuredInfo} = this.props.productsAPI;


    return (
      <ProductWrapper className= 'col-9 mx-auto col-m-6 col-lg-3 my-3' onClick={() => {this.context.openModalProduct(_id);}}>
        <div className= 'card'>
              <div className= 'img-container p-2'>               
                 {/*<img src={'http://localhost:3000/uploads/1605541890343pool.jpg'} alt='img'/>*/}
                <img src={`https://shop-mobile-full-stack.herokuapp.com/${productImage[0]}`} alt='img' className='img-fluid'/>
              </div>
          {/* card footer */}
          <div className='card-footer'>
            <p className='text-uppercase align-self-center mb-1'><strong>model : </strong><span className='text-uppercase text-hover'>{name}</span></p>
            <p className='text-uppercase align-self-center mb-1'><strong>made by : </strong><span className='text-uppercase text-title'>{company}</span></p>
            <p className='text-uppercase text-uppercase align-self-center mb-1'><strong> price : </strong><span className='mr-1 text-bright'>$ {price}</span></p>
            <p className='align-self-center mb-1'><strong className="text-uppercase">product info :</strong> {info}</p>
            {featured ? 
              (
                <p className='text-uppercase align-self-center mb-1'><strong>featured :</strong> <i className="fas fa-check-square"></i></p>
              ) 
              : 
              (
                <p className='text-uppercase align-self-center mb-1'><strong>featured :</strong> <i className="fas fa-window-close"></i></p>
              )
            }
            <p className='align-self-center mb-1'><strong className="text-uppercase">featured info :</strong> {featuredInfo}</p>
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