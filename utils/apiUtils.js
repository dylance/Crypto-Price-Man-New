module.exports = {
  swapProperty: (obj, newProp, oldProp) => {
    obj[newProp] = obj[oldProp];
    delete obj[oldProp];
  }  
}
