// 数组指定索引位置调换
const swapArray = (arr: Array<any>, index1: number, index2: number) => {
    const _arr = [...arr];
    const item = arr[index1];
    _arr[index1] = arr[index2];
    _arr[index2] = item;
    return _arr;
}

export {
    swapArray
}