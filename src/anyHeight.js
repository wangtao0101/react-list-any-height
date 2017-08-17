import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Computer from './computer';
import Row from './row';

export default class AnyHeight extends Component {
    constructor(props) {
        super(props);

        const { dataSource, minRowHeight, height, preloadBatchSize } = props;

        this.computer = new Computer(minRowHeight, dataSource.length, height);

        this.state = Object.assign({
            isScrolling: false,
        }, this.computer.getDisplayData(0, preloadBatchSize, 0, 0));

        this.handleScroll = this.handleScroll.bind(this);
        this.updateRowHeight = this.updateRowHeight.bind(this);
        this.manageScrollTimeOut = this.manageScrollTimeOut.bind(this);

        this.lastScrollTop = 0;
    }

    componentDidMount() {
        const { beginIndex, endIndex } = this.state;
        this.computer.updateRowHeightAfterScroll(beginIndex, endIndex);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.dataSource !== this.props.dataSource
            || nextProps.minRowHeight !== this.props.minRowHeight) {
            const { dataSource, minRowHeight, height, preloadBatchSize } = nextProps;
            this.computer = new Computer(minRowHeight, dataSource.length, height);
            this.setState(Object.assign({
                isScrolling: false,
            }, this.computer.getDisplayData(this.lastScrollTop, preloadBatchSize, 0, 0)));
        }
    }

    componentDidUpdate() {
        if (this.state.isScrolling) {
            const { beginIndex, endIndex } = this.state;
            this.ref.scrollTop = this.lastScrollTop;
            this.computer.updateRowHeightAfterScroll(beginIndex, endIndex);
        }
    }

    handleScroll(e) {
        const { scrollTop } = e.target;
        const { beginIndex, beforeHeight } = this.state;

        if (scrollTop === this.lastScrollTop) {
            return;
        }

        this.manageScrollTimeOut();

        this.setState(this.computer.getDisplayData(scrollTop
            , this.props.preloadBatchSize, beginIndex, beforeHeight));

        this.lastScrollTop = scrollTop;
    }

    updateRowHeight(index, height) {
        this.computer.cacheRowHeight(index, height);
    }

    manageScrollTimeOut() {
        if (this.state.scrollTimeout) {
            clearTimeout(this.state.scrollTimeout);
        }

        const that = this;
        const scrollTimeout = setTimeout(() => {
            that.setState({
                isScrolling: false,
                scrollTimeout: undefined,
            });
        }, this.props.timeScrollStateLastsForAfterUserScrolls);

        this.setState({
            isScrolling: true,
            scrollTimeout,
        });
    }

    render() {
        const { minRowHeight, height, style, rowStyle, rowRender } = this.props;
        const { beginIndex, endIndex, beforeHeight, afterHeight } = this.state;
        const wapperStyle = Object.assign({}, style, {
            height: `${height}px`,
            overflowY: 'scroll',
        });

        const rowWapperStyle = Object.assign({}, rowStyle, {
            minHeight: `${minRowHeight}px`,
        });

        const showData = [];
        for (let index = beginIndex; index <= endIndex; index += 1) {
            showData.push(
                <Row
                    key={index}
                    index={index}
                    updateRowHeight={this.updateRowHeight}
                >
                    {rowRender(index, rowWapperStyle)}
                </Row>
            );
        }

        return (
            // eslint-disable-next-line no-return-assign
            <div style={wapperStyle} onScroll={this.handleScroll} ref={ref => this.ref = ref}>
                <div style={{ height: `${beforeHeight}px` }} />
                {showData}
                <div style={{ height: `${afterHeight}px` }} />
            </div>
        );
    }
}

AnyHeight.defaultProps = {
    height: 300,
    preloadBatchSize: 5,
    style: {
        width: '100%',
    },
    rowStyle: {},
    minRowHeight: 32,
    timeScrollStateLastsForAfterUserScrolls: 150,
};

AnyHeight.propTypes = {
    dataSource: PropTypes.array.isRequired,
    minRowHeight: PropTypes.number.isRequired,
    height: PropTypes.number,
    preloadBatchSize: PropTypes.number,
    style: PropTypes.shape({
        width: PropTypes.any,
    }),
    rowStyle: PropTypes.object,
    rowRender: PropTypes.func.isRequired,
    timeScrollStateLastsForAfterUserScrolls: PropTypes.number,
};
