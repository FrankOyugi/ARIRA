export const arrPriceRanges = [
    "0-100000",
    "100000-400000",
    "400000-75000",
    "75000-120000",
    "120000-500000"
]

export const priceRangeToIndex = (priceRange) => {
   const index = arrPriceRanges.findIndex(priceRg => priceRg === priceRange)

   return index
}