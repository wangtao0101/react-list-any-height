import React from 'react';
import AnyHeight from '../src/anyHeight';
import getData from './getData';

export default () => {
    const dataSource = getData();

    return (
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
    );
};

