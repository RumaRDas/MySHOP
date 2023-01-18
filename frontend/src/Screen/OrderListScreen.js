import React, { useEffect } from 'react'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Message from '../components/Message'
import Loader from '../components/Loader'
import { LinkContainer } from 'react-router-bootstrap'
import { getOrderList } from '../actions/orderActions'
import { getUserList, deleteUser } from '../actions/userActions'

const OrderListScreen = ({ history }) => {
    const dispatch = useDispatch()

    const orderList = useSelector(state => state.orderList)
    const { orders, error, loading } = orderList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const { success: successDelete } = userDelete

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(getOrderList())
        } else {
            history.push('/login')
        }

    }, [dispatch, history, userInfo])


    return (
        <>
            <h1>Orders</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (<Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>USER NAME</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>DELEVERED</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.user && order.user.name}</td>
                            {/* <td><p>{order.shippingAddress.address}</p><p>{order.shippingAddress.city}</p><p>{order.shippingAddress.postalCode}</p><p>{order.shippingAddress.country}</p></td>
                            <td>{order.orderItems.name}</td> */}

                            <td>{order.createdAt.substring(0, 10)}</td>
                            <td>${order.totalPrice}</td>
                            <td>{order.isPaid ? (order.paidAt.substring(0, 10)) : <i className='fas fa-times' style={{ color: 'red' }}></i>}</td>
                            <td>{order.isDelivered ? (order.deliveredAt.substring(0, 10)) : <i className='fas fa-times' style={{ color: 'red' }}></i>}</td>
                            <td>
                                <LinkContainer to={`/order/${order._id}/edit`}>
                                    <Button variant='light' className='btn-sm'>Details</Button>
                                </LinkContainer>
                            </td>
                            {/* <td>
                                <Button variant='danger' className='btn-sm' >
                                    <i className='fas fa-trash'></i>
                                </Button>
                            </td> */}
                        </tr>
                    )
                    )}
                </tbody>
            </Table>)
            }
        </>
    )
}

export default OrderListScreen