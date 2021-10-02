const { getPriceTicker } = require('../../services/coinbasepro');

const getProductPriceTicker = async function(req, res) {
  try {
    const { productId } = req.query;
    const priceTicker = await getPriceTicker(productId);
    res.status(200).send(priceTicker);


  } catch (err) {
    res.status(500).send('error: ', err.message)
  }


};

module.exports = getProductPriceTicker;
