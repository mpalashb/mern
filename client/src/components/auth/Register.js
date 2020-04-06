import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { register } from '../../actions/auth'
import { setAlert } from '../../actions/alert'
import Spinner from '../layout/Spinner'


const Register = ({ setAlert, register, auth }) => {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: '',
        password2: ''
    })
    const { name, username, password, password2 } = formData

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = async e => {
        e.preventDefault();
        if (password !== password2) {
            setAlert('Passwords do not match', 'danger');
        } else {
            register({ name, username, password });
        }
    };

    useEffect(() => {
        document.title = 'Register Page'
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
                            <h5 className="card-title text-center">Register Now!</h5>
                            <form className="form-signun" onSubmit={e => onSubmit(e)}>
                                <div className="form-label-group">
                                    <input
                                        type="text"
                                        className="form-control mb-2"
                                        placeholder="Full Name"
                                        name='name'
                                        value={name}
                                        onChange={e => onChange(e)}
                                    />
                                </div>
                                <div className="form-label-group">
                                    <input
                                        type="text"
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
                                        className="form-control mb-2"
                                        placeholder="Password"
                                        name='password'
                                        value={password}
                                        onChange={e => onChange(e)}
                                    />
                                </div>
                                <div className="form-label-group">
                                    <input
                                        type="password"
                                        className="form-control mb-2"
                                        placeholder="Confirm Password"
                                        name='password2'
                                        value={password2}
                                        onChange={e => onChange(e)}
                                    />
                                </div>
                                <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign Up!</button>
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


Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});


export default connect(mapStateToProps, { register, setAlert })(Register)
