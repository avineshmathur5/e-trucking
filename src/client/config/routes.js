import { BrowserRouter as Router, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import LoaderComponent from '../components/loader/';
import PropTypes from 'prop-types';
import React from 'react';

const LazyLoad = (props) => {
  //cloning props
  let routerProps = Object.assign({}, props);
  routerProps.component = Loadable({ loader: props.component, loading: LoaderComponent })
  return <Route {...routerProps} />;
}

const Routes = () => (
  <Router>
    <div>
      <LazyLoad exact path="/" component={() => import("../components/login/")} />
      <LazyLoad path="/login" component={() => import("../components/login/")} />
      <LazyLoad path="/about" component={() => import("../components/about/")} />
    </div>
  </Router>
)
export default Routes;

LazyLoad.propTypes = {
  component: PropTypes.func
}
