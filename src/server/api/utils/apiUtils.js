module.exports = {

  swapProperty: (obj, newProp, oldProp) => {
    obj[newProp] = module.exports.roundDecimals(obj[oldProp]);
    delete obj[oldProp];
  },

  multiSwap: (obj, swapVars) => {
    swapVars.forEach(vars => {
      module.exports.swapProperty(obj, vars[0], vars[1])
    })
  },

  roundDecimals: (stat) => {
    let statNum = parseFloat(stat);
    return statNum > 1 ?  statNum.toFixed(2) :  statNum;
  }
}
