
import { useEffect } from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from 'react-redux';
import {Button, Row, Col, ListGroup, Image, Card} from 'react-bootstrap';
import CheckoutSteps from '../components/CheckoutSteps';


const PlaceOrderScreen = () => {
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);

    useEffect(() => {
        if (!cart.shippingAddress.address) {
            navigate('/shipping');
        } else if (!Card.paymentMethod) {
            navigate('/payment');
        }
    }, [cart.paymentMethod, cart.shippingAddress.address, navigate])
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4/>
    </>
  )
}

export default PlaceOrderScreen;