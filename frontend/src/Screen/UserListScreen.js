import React, { useEffect } from 'react'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Message from '../components/Message'
import Loader from '../components/Loader'
import { LinkContainer } from 'react-router-bootstrap'
import { getUserList, deleteUser } from '../actions/userActions'


const UserListScreen = ({ history }) => {
    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const { users, error, loading } = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const { success: successDelete } = userDelete

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(getUserList())
        } else {
            history.push('/login')
        }

    }, [dispatch, history, userInfo, successDelete])

    const deletHandler = (id) => {
        if (window.confirm('Are You want to delete ')) {
            dispatch(deleteUser(id))
        }

    }
    return (
        <>
            <h1>Users</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (<Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Admin</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td><a href={`mailto:${user.email}`}>{user.isAdmin}</a></td>
                            <td>{user.isAdmin ? (<i className='fas fa-check' style={{ color: 'green' }}></i>) : <i className='fas fa-times' style={{ color: 'red' }}></i>}</td>
                            <td>
                                <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                    <Button variant='light' className='btn-sm'><i className='fas fa-edit'></i></Button>
                                </LinkContainer>
                                <Button variant='danger' className='btn-sm' onClick={() => deletHandler(user._id)}>
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

export default UserListScreen