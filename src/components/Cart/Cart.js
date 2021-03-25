import React from 'react';
import Title from '../Title';
import CartColumms from './CartColumms';
import EmptyCart from './EmptyCart';
import {ProductConsumer1} from '../../context';
import CartList from './CartList';
import CartTotals from './CartTotals';
import ModalCart from './ModalCart';
import ScrollUpButton from "react-scroll-up-button";


export default function Cart ({kosik}) {
	
		return (
			<>
			<section>
				<ProductConsumer1>

					{kosik => {
						const {cartAPI} = kosik;
						// cart su storeProducts
						if(cartAPI.length > 0) {
							return(
								<React.Fragment>
								<Title name='your' title='cart'/>
								<CartColumms/>
								<CartList kosik={kosik}/>
								<ModalCart/>	
								<CartTotals kosik={kosik}/>
								</React.Fragment>
								)
						}
						else {
							return <EmptyCart/>
						}
					}}
				</ProductConsumer1>
			</section>
			<ScrollUpButton/>
			</>
		)
}