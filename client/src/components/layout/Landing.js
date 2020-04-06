import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
// import PropTypes from 'prop-types'

const Landing = props => {
    useEffect(() => {
        document.title = 'Dev-QS'
    }, []);

    return (
        <div>
            <div className="bg-white">
                <div className="container py-4">
                    <h3 className="mb-2">Ask any questions <Link className="btn btn-link ask" to="/ask">Ask here!</Link> </h3>


                    <section className="call-to-action text-white text-center">
                        <div className="overlay"></div>
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-9 mx-auto">
                                    <h2 className="mb-4">Ready to get started? Sign up now!</h2>
                                </div>
                                <div className="col-md-10 col-lg-8 col-xl-7 mx-auto">

                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

// Landing.propTypes = {

// }

export default Landing
