
/**
 * Track the trade of a commodity from one trader to another
 * @param {org.zalum.scm.TradePurchaseOrder} trade - the trade to be processed
 * @transaction
 */
function tradePurchaseOrder(tradePurchaseOrder){
  tradePurchaseOrder.article.owner = tradePurchaseOrder.newOwner;
  return getAssetRegistry('org.zalum.scm.Article')
        .then(function (assetRegistry) {           
            return assetRegistry.update(tradePurchaseOrder.article);
        });
}
