import React, { Fragment } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth'
import { connect } from 'react-redux'
import Spinner from './Spinner'


const Navbar = ({ auth: { isAuthenticated, loading, isLoading, userLoading, loggedOut }, logout }) => {
    const authNAV = (
        <Fragment>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link className="btn btn-warning ml-2" to="/questions">Question List</Link>
                    <Link className="btn btn-success ml-2 ask" to="/ask">Ask here!</Link>
                </div>

            </div>

            <ul className="nav navbar-nav navbar-right">
                <Link className="btn btn-success navLogin text-center" to="/dashboard">Dashboard</Link>
                <a className="btn btn-danger text-center text-white" onClick={logout}>Logout</a>
            </ul>


        </Fragment>
    )

    const noneauthNav = (
        <Fragment>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link className="btn btn-warning ml-2" to="/questions">Question List</Link>
                    <Link className="btn btn-success ml-2 ask" to="/ask">Ask here!</Link>
                </div>
            </div>

            <ul className="nav navbar-nav navbar-right">
                {userLoading && <Spinner />}
                <Link className="btn btn-success navReg text-center" to="/register">Register</Link>
                <Link className="btn btn-success navLogin text-center" to="/login">Login</Link>
            </ul>



        </Fragment>
    )





    return (
        <div className="bg-light">
            <nav className="navbar navbar-expand-lg container">
                <Link className="btn btn-success" to="/">DevQS</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon">Toggle</span>
                </button>

                {
                    isAuthenticated ? authNAV : noneauthNav
                }


            </nav>
        </div>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, { logout })(Navbar)
