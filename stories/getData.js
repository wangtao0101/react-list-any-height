export default function getData() {
    const dataSource = [];
    let height;

    for (let index = 0; index < 10000; index += 1) {
        const randamNum = Math.random() * 10;
        height = 100 + Math.round(Math.abs((Math.sin(index) * 200)));
        if (randamNum < 3) {
            dataSource.push({
                key: index,
                text: `number: ${index} hieght: ${height} a`,
                height,
            });
        } else if (randamNum < 7) {
            dataSource.push({
                key: index,
                text: `number: ${index} hieght: ${height} b`,
                height,
            });
        } else {
            dataSource.push({
                key: index,
                text: `number: ${index} hieght: ${height} c`,
                height,
            });
        }
    }
    return dataSource;
}
