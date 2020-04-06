import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner'
import { connect } from 'react-redux'
import { login } from '../../actions/auth'
import { Redirect } from 'react-router-dom'

const Login = ({ auth, login, setAlert }) => {

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    const { username, password } = formData

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault();
        login(username, password)

    }

    useEffect(() => {
        document.title = 'Login Page'
    }, [])


    if (auth.isAuthenticated) {
        return <Redirect to='/dashboard' />;
    }


    return (

        <div className="container">
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card card-signin my-5">
                        <div className="card-body">
                            <h5 className="card-title text-center">Login Now!</h5>
                            <form className="form-signin" onSubmit={e => onSubmit(e)}>
                                <div className="form-label-group">
                                    <input
                                        type="text"
                                        id="inputUser"
                                        className="form-control mb-2"
                                        placeholder="Username"
                                        name='username'
                                        value={username}
                                        onChange={e => onChange(e)}
                                    />
                                </div>

                                <div className="form-label-group">
                                    <input
                                        type="password"
                                        id="inputPassword"
                                        className="form-control mb-2"
                                        placeholder="Password"
                                        name='password'
                                        value={password}
                                        onChange={e => onChange(e)}
                                    />
                                </div>
                                <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button>
                                <hr className="my-4" />
                                {!auth.isAuthenticated && auth.isLoading && <Spinner />}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
    return {
        auth: state.auth,

    }
}


export default connect(
    mapStateToProps,
    { login }
)(Login);