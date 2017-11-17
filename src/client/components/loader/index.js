import React from 'react';
import loader from '../../static/images/ajax-loader.gif';
import PropTypes from 'prop-types';
const LoaderComponent = ({ isLoading, error }) => {
    // Handle the loading state
    if (isLoading) {
        return <div className="container loader"><img src={loader} alt="Loading..." /></div>;
    } else if (error) {
        return <div className="container alert alert-danger">Sorry, there was a problem loading the page.</div>;
    } else {
        return null;
    }
};
export default LoaderComponent;
LoaderComponent.propTypes = {
    isLoading: PropTypes.bool,
    error: PropTypes.string
}
