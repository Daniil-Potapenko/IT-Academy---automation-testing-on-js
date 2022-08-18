module.exports = priceFormater

function priceFormater(price){
    price =  price.join().trim().slice(0,-6).replace(/\s/g,'')
    price = Number(price)
    return price
}