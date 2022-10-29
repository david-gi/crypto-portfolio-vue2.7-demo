export const ToFixed = function (val: number, digits: number) {
    const multiplier = Math.pow(10, digits);
    const adjustedNum = val * multiplier;
    const truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);
    return truncatedNum / multiplier;
};
export const FormatCurrency = function (val: number, digits: number) {
    return ToFixed(val, digits).toLocaleString('en-us', { minimumFractionDigits: 2 });
}