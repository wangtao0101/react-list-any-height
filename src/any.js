import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Any extends Component {
    componentDidMount() {
        this.props.updateRowHeight(this.props.index, this.ref.getBoundingClientRect().height);
    }

    componentDidUpdate() {
        this.props.updateRowHeight(this.props.index, this.ref.getBoundingClientRect().height);
    }

    render() {
        // eslint-disable-next-line no-return-assign
        return React.cloneElement(this.props.children, { ref: ref => this.ref = ref });
    }
}

Any.propTypes = {
    updateRowHeight: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    children: PropTypes.array.isRequired,
};

