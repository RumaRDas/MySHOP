import React, { useState } from 'react'
import { Col, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

const PaymentScreen = ({ history }) => {
  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress) {
    history.push('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    // console.log("PaymentMethod", paymentMethod)
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>
            Select Method
          </Form.Label>

          <Col>
            <Form.Check type='radio' label='PayPal or Credit Card' id="PayPal" name="paymentMethod" value="PayPal" onChange={(e) => setPaymentMethod(e.target.value)}>

            </Form.Check>

            <Form.Check type='radio' label='Strip' id="Strip" name="paymentMethod" value="Strip" onChange={(e) => setPaymentMethod(e.target.value)}>

            </Form.Check>

          </Col>
        </Form.Group>
        <Button type="submit" variant='primary' className='my-3'> Continue</Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen