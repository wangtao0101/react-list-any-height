import React from 'react';
import AnyHeight from '../src/anyHeight';
import getData from './getData';

export default class TestAnyHeightChangeData extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: getData(),
        };

        this.changeDataSource = this.changeDataSource.bind(this);
    }

    changeDataSource() {
        this.setState({
            dataSource: getData(),
        });
    }

    render() {
        const { dataSource } = this.state;

        return (
            <div>
                <button onClick={() => this.changeDataSource()}>change data</button>
                <AnyHeight
                    dataSource={dataSource}
                    height={600}
                    minRowHeight={100}
                    style={{
                        border: '1px solid #e0e0e0',
                    }}
                    rowStyle={{
                        border: '1px solid #e0e0e0',
                    }}
                    rowRender={(index, style) => (
                        <div className="hover-row" style={Object.assign({}, style, { height: `${dataSource[index].height}px` })}>{dataSource[index].text}</div>
                    )}
                />
            </div>
        );
    }
}
