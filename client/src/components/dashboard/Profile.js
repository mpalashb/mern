import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
// import Spinner from '../layout/Spinner'
import { connect } from 'react-redux'
import { deleteAccount } from '../../actions/auth'


const Profile = ({ auth, deleteAccount }) => {

    useEffect(() => {
        document.title = 'Dashboard'
    }, [])

    if (!auth.isAuthenticated) {
        return <Redirect to='/login' />;
    }

    return (
        <div className="container">
            <div className="container-fluid">
                <div className="row" id="main" >
                    <div className="col-sm-12 col-md-12 well" id="content">
                        <h4>Your Dashboard!</h4>
                        <hr />
                        <b>Username: {auth.username}</b>
                        <hr />
                        <b>Full Name: {auth.name}</b>
                    </div>
                </div>
                <hr />
                <hr />
                <div className='my-2'>
                    <button className='btn btn-danger' onClick={() => deleteAccount()}>
                        <i className='fas fa-user-minus' /> Delete My Account
                    </button>
                </div>
            </div>
        </div>
    )
}


Profile.propTypes = {
    auth: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func,
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, { deleteAccount })(Profile)
