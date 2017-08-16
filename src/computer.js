import binaryIndexSearch from './binaryIndexSearch';

export default class Computer {
    constructor(minRowHeight, length, height) {
        this.initRowOffSet(minRowHeight, length);
        this.minRowHeight = minRowHeight;
        this.height = height;
        this.length = length;
    }

    initRowOffSet(minRowHeight, length) {
        this.rowData = [];
        for (let index = 0; index < length; index += 1) {
            this.rowData.push({
                offset: index * minRowHeight,
                height: minRowHeight,
                delayHeight: 0,
                delayOffset: 0,
            });
        }
    }

    cacheRowHeight(index, height) {
        this.rowData[index].delayHeight = height - this.rowData[index].height;
        this.rowData[index].height = height;
    }

    updateRowHeightAfterScroll(beginIndex, endIndex) {
        for (let i = beginIndex; i < this.rowData.length; i += 1) {
            if (i <= endIndex) {
                if (i === beginIndex) {
                    this.rowData[i].delayOffset = this.rowData[i].delayHeight;
                } else {
                    this.rowData[i].offset += this.rowData[i - 1].delayOffset;
                    this.rowData[i].delayOffset =
                        this.rowData[i].delayHeight + this.rowData[i - 1].delayOffset;
                }
            } else if (i > 0 && this.rowData[i - 1].delayOffset === 0) {
                i = this.rowData.length;
            } else {
                this.rowData[i].delayOffset = this.rowData[i - 1].delayOffset;
                this.rowData[i].offset += this.rowData[i].delayOffset;
            }
        }
    }

    getBeginIndex(scrollTop, preloadBatchSize) {
        const beginIndex = binaryIndexSearch(this.rowData, scrollTop, 1) || 0;
        if (beginIndex >= preloadBatchSize) {
            return beginIndex - preloadBatchSize;
        }
        return 0;
    }

    getEndIndex(scrollTop, preloadBatchSize) {
        const endIndex = binaryIndexSearch(this.rowData, scrollTop + this.height, 2)
        || this.length - 1;
        if (endIndex + preloadBatchSize < this.length) {
            return endIndex + preloadBatchSize;
        }
        return this.length - 1;
    }

    getDisplayData(scrollTop, preloadBatchSize, lastBeginIndex, lastBeforeHeight) {
        const beginIndex = this.getBeginIndex(scrollTop, preloadBatchSize);
        const endIndex = this.getEndIndex(scrollTop, preloadBatchSize);

        const beforeHeight = beginIndex === lastBeginIndex ?
            lastBeforeHeight : this.rowData[beginIndex].offset;
        const afterHeight = this.rowData[this.length - 1].offset
            - (this.rowData[endIndex].offset - this.rowData[beginIndex].offset)
            - beforeHeight;
        return {
            beginIndex,
            endIndex,
            beforeHeight,
            afterHeight,
        };
    }
}

