import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const Alert = ({ msg, type, id }) => {
    return (
        <div key={id} className={`container alert alert-${type} alertC text-center`}>
            <strong>{msg}</strong>
        </div>

    )
}


Alert.propTypes = {
    type: PropTypes.string,
    id: PropTypes.string
};

const mapStateToProps = state => ({
    msg: state.alert.msg,
    type: state.alert.alertType,
    id: state.alert.id
});

export default connect(mapStateToProps)(Alert);


