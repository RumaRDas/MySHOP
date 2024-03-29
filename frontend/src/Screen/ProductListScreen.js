import React, { useEffect } from 'react'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Message from '../components/Message'
import Loader from '../components/Loader'
import { LinkContainer } from 'react-router-bootstrap'
import { listProducts, deleteProduct, createProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

const ProductListScreen = ({ history, match }) => {
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productDelete = useSelector(state => state.productDelete)
    const { success: deleteSuccess, loading: loadingDelet, error: errorDelete } = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const { success: createdSuccess, error: createdError, product: createdProduct, loading: createdLoading } = productCreate

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })
        if (!userInfo.isAdmin) {
            history.push('/login')
        }
        if (createdSuccess) {
            history.push(`/admin/product/${createdProduct._id}/edit`)
        } else {
            dispatch(listProducts())
        }

    }, [dispatch, history, userInfo, deleteSuccess, createdSuccess, createdProduct])

    const deletHandler = (id) => {
        if (window.confirm('Are You want to delete ')) {
            //delete Product
            dispatch(deleteProduct(id))
        }

    }
    const createProductHandler = (product) => {
        //createProduct
        dispatch(createProduct())
    }
    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-right'><Button className='my-3' onClick={createProductHandler}><i className='fas fa-plus'></i>Create Product</Button></Col>
            </Row>
            {loadingDelet && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {createdLoading && <Loader />}
            {createdError && <Message variant='danger'>{createdError}</Message>}
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (<Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th>BRAND</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>
                                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                    <Button variant='light' className='btn-sm'><i className='fas fa-edit'></i></Button>
                                </LinkContainer>
                                <Button variant='danger' className='btn-sm' onClick={() => deletHandler(product._id)}>
                                    <i className='fas fa-trash'></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>)}
        </>
    )
}


export default ProductListScreen