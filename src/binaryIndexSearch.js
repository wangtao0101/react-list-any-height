const opts = {
    CLOSEST_LOWER: 1,
    CLOSEST_HIGHER: 2,
};

export default function (array, item, opt) {
    let index;

    let high = array.length - 1;
    let low = 0;
    let middle;
    let middleItem;

    while (low <= high) {
        middle = low + Math.floor((high - low) / 2);
        middleItem = array[middle].offset;

        if (middleItem === item) {
            return middle;
        } else if (middleItem < item) {
            low = middle + 1;
        } else if (middleItem > item) {
            high = middle - 1;
        }
    }

    if (opt === opts.CLOSEST_LOWER && low > 0) {
        index = low - 1;
    } else if (opt === opts.CLOSEST_HIGHER && high < array.length - 1) {
        index = high + 1;
    }

    return index;
}
