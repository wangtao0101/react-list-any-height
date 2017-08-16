import React from 'react';
import AnyHeight from '../src/anyHeight';

export default () => {
    const dataSource = [];

    for (let index = 0; index < 10000; index += 1) {
        const randamNum = Math.random() * 10;
        if (randamNum < 3) {
            dataSource.push({
                key: index,
                text: `${index} aaaa`,
                height: 100 + Math.round(Math.abs((Math.sin(index) * 200))),
            });
        } else if (randamNum < 7) {
            dataSource.push({
                key: index,
                text: `${index} bbbbbb bbbbbbbb`,
                height: 100 + Math.round(Math.abs((Math.sin(index) * 200))),
            });
        } else {
            dataSource.push({
                key: index,
                text: `${index} cccccc cccccccc cccccccccc`,
                height: 100 + Math.round(Math.abs((Math.sin(index) * 200))),
            });
        }
    }

    return (
        <AnyHeight
            length={dataSource.length}
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

