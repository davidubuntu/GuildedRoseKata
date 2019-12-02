const changes = require('./changes');

class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }

  updateQuality(){
    return this.items.map(changes);
  }
}
module.exports = {
  Item,
  Shop
}
