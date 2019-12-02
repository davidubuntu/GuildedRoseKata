const GENERAL = 'general';
const AGED_BRIE = 'Aged Brie';
const SULFURAS = 'Sulfuras, Hand of Ragnaros';
const PASSES = 'Backstage passes to a TAFKAL80ETC concert';
const CONJURED = 'Conjured';

const sellInChanges = {
    [GENERAL]: item => item.sellIn - 1,
    [SULFURAS]: item => item.sellIn,
};

const limitQuality = quality => {
    if (quality >= 50) return 50;
    if (quality <= 0) return 0;
    return quality;
};

const qualityChanges = {
    [GENERAL]: item => {
        let quality = item.sellIn > 0 ? item.quality - 1 : item.quality - 2;
        return limitQuality(quality);
    },
    [AGED_BRIE]: item => {
        let quality = item.quality + 1;
        return limitQuality(quality);
    },
    [SULFURAS]: () => 80,
    [PASSES]: item => {
        const {quality, sellIn} = item;
        let newQuality;
        if (sellIn > 10) newQuality = quality + 1;
        else if (sellIn <= 10 && sellIn > 5) newQuality = quality + 2;
        else if (sellIn > 0 && sellIn <= 5) newQuality = quality + 3;
        else if (sellIn <= 0) newQuality = 0;
        return limitQuality(newQuality);
    },
    [CONJURED]: item => {
        let quality = item.quality - 2;
        return limitQuality(quality);
    },
};

const updates = item => ({
    name: item.name,
    sellIn: (sellInChanges[item.name] || sellInChanges[GENERAL])(item),
    quality: (qualityChanges[item.name] || qualityChanges[GENERAL])(item),
});


module.exports = item => updates(item);

module.exports.types = {
    GENERAL,
    AGED_BRIE,
    SULFURAS,
    PASSES,
    CONJURED,
};
