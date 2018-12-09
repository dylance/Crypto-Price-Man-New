module.exports = {

  swapProperty: (obj, newProp, oldProp) => {
    obj[newProp] = obj[oldProp];
    delete obj[oldProp];
  },

  multiSwap: (obj, swapVars) => {
    swapVars.forEach(vars => {
      module.exports.swapProperty(obj, vars[0], vars[1])
    })
  }
}
