# react-list-any-height

React scroll list for item with any height.

Example: https://wangtao0101.github.io/react-list-any-height/

## Motivation
[react virtualized](https://github.com/bvaughn/react-virtualized) and [react-infinite](https://github.com/seatgeek/react-infinite) can only handle list with fixed height, but that may not always be the case.

## Install
```
npm install react-list-any-height --save
yarn add react-list-any-height
```

## Basic Use
### Elements of Any Height
As we don't know the height of all row before the row had been rendered, we figure out the height of contianer by using minRowHeight.
```
<AnyHeight
    dataSource={dataSource}
    minRowHeight={100}
    rowRender={(index, style) => (
        <div className="hover-row" style={style)}></div>
    )}
/>
```

## How to work
We figure out the origin height of contianer by using minRowHeight. After you scroll and the more row will be rendered, we using new heights to update component in next scrolling.

## Note on Smooth Scrolling
minRowHeight should be set reasonable, otherwise if you scroll to end fastly and then you scroll to up slowly, then page will jump.


## Api
### dataSource
the data array, isRequired

### minRowHeight
The minimum height of all rows, isRequired

### height
The height of scrolling contianer, default to 300.

### preloadBatchSize
The items rendered out of contianer, default to 5.

### style
The style of contianer, default to style: { width: '100%' }.

### rowStyle
The style of row

### rowRender
A function for rendering a row, isRequired

### timeScrollStateLastsForAfterUserScrolls(same as react-infinite)

Defaults to 150 (in milliseconds). On Apple and some other devices, scroll is inertial. This means that the window continues to scroll for several hundred milliseconds after an onScroll event is fired. To prevent janky behavior, we do not want pointer-events to reactivate before the window has finished moving. Setting this parameter causes the Infinite component to think that the user is still scrolling for the specified number of milliseconds after the last onScroll event is received.

## Thanks
Some code from [react-infinite](https://github.com/seatgeek/react-infinite)

## Roadmap
- [ ] full test
- [ ] Using the Window to Scroll
