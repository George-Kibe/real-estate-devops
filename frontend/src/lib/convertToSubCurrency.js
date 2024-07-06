function convertToSubCurrency(amount, factor=100){
    return Math.round(amount * factor);
}
export default convertToSubCurrency;