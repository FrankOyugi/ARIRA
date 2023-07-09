export const arrPriceRanges = [
    "0-10000",
    "10000-40000",
    "40000-75000",
    "75000-120000",
    "120000-500000"
]

export const priceRangeToIndex = (priceRange) => {
   const index = arrPriceRanges.findIndex(priceRg => priceRg === priceRange)

   return index
}