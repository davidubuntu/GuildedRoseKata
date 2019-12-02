const {expect} = require('chai');
const {Shop, Item} = require('../src/gilded_rose.js');
const {types} = require('../src/changes');

describe("Gilded Rose", () => {
    it("should work as expected with normal item with remaining sellIn and quality", () => {
        const gildedRose = new Shop([new Item("foo", 1, 1)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal("foo");
        expect(items[0].sellIn).to.equal(0);
        expect(items[0].quality).to.equal(0);
    });

    it("should work as expected with normal item without sellIn, quality decreases twice", () => {
        const gildedRose = new Shop([new Item("foo", 0, 4)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal("foo");
        expect(items[0].sellIn).to.equal(-1);
        expect(items[0].quality).to.equal(2);
    });

    it("should work as expected with normal item with remaining sellInm quelity cant be less than 0", () => {
        const gildedRose = new Shop([new Item("foo", 2, 0)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal("foo");
        expect(items[0].sellIn).to.equal(1);
        expect(items[0].quality).to.equal(0);
    });

    it("should work as expected with Aged Brie item with remaining sellIn, quality must be increased", () => {
        const gildedRose = new Shop([new Item(types.AGED_BRIE, 2, 2)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal(types.AGED_BRIE);
        expect(items[0].sellIn).to.equal(1);
        expect(items[0].quality).to.equal(3);
    });

    it("should work as expected with Aged Brie item with remaining sellInm quelity cant be more than 50", () => {
        const gildedRose = new Shop([new Item(types.AGED_BRIE, 3, 50)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal(types.AGED_BRIE);
        expect(items[0].sellIn).to.equal(2);
        expect(items[0].quality).to.equal(50);
    });

    it("should work as expected with Sulfuras item, remaining sellIn will be not modified, and quality the same", () => {
        const gildedRose = new Shop([new Item(types.SULFURAS, 10, 80)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal(types.SULFURAS);
        expect(items[0].sellIn).to.equal(10);
        expect(items[0].quality).to.equal(80);
    });

    it("should work as expected with Backstage passes item, remaining sellIn will increase the quality according to the sellIn", () => {
        const gildedRose = new Shop(
            [new Item(types.PASSES, 15, 0),
            new Item(types.PASSES, 8, 0),
            new Item(types.PASSES, 4, 0),
            new Item(types.PASSES, 0, 10)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal(types.PASSES);
        expect(items[0].sellIn).to.equal(14);
        expect(items[0].quality).to.equal(1);
        expect(items[1].name).to.equal(types.PASSES);
        expect(items[1].sellIn).to.equal(7);
        expect(items[1].quality).to.equal(2);
        expect(items[2].name).to.equal(types.PASSES);
        expect(items[2].sellIn).to.equal(3);
        expect(items[2].quality).to.equal(3);
        expect(items[3].name).to.equal(types.PASSES);
        expect(items[3].sellIn).to.equal(-1);
        expect(items[3].quality).to.equal(0);
    });

    it("should work as expected with Conjured item, remaining sellIn and quality", () => {
        const gildedRose = new Shop([new Item(types.CONJURED, 5, 10)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal(types.CONJURED);
        expect(items[0].sellIn).to.equal(4);
        expect(items[0].quality).to.equal(8);
    });
});
