export const ToFixed = (val: number, digits: number): number => {
    const multiplier = Math.pow(10, digits);
    const adjustedNum = val * multiplier;
    const truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);
    return truncatedNum / multiplier;
};
export const FormatCurrency = (val: number, digits: number): string => {
    return ToFixed(val, digits).toLocaleString('en-us', { minimumFractionDigits: 2 });
}