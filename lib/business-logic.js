/**
 * @param {org.zalum.scm.RequestPurchaseOrder} transaction 
 * @transaction
 */
function requestPurchaseOrder(transaction){  
  purchaseOrder = getFactory().newResource('org.zalum.scm', 'PurchaseOrder', transaction.purchaseOrderId);
  purchaseOrder.article = transaction.article
  purchaseOrder.purchaser = transaction.purchaser
  purchaseOrder.supplier = transaction.supplier
  purchaseOrder.quantity = transaction.quantity
  return getAssetRegistry('org.zalum.scm.PurchaseOrder')
        .then(function (registry) {           
            return registry.add(purchaseOrder);
        });
}

/**
 * @param {org.zalum.scm.ShipTransport} transaction
 * @transaction
 */
function shipTransport(transaction){
  purchaseOrder = transaction.purchaseOrder
  transport = getFactory().newResource('org.zalum.scm','Transport',transaction.transportId);
  transport.article = purchaseOrder.article
  transport.quantity = purchaseOrder.quantity
  transport.owner = purchaseOrder.supplier
  transaction.stock.quantity = transaction.stock.quantity-purchaseOrder.quantity  
  getAssetRegistry('org.zalum.scm.Stock')
        .then(function (registry) {           
            return registry.update(transaction.stock);
        });
  
  return getAssetRegistry('org.zalum.scm.Transport')
        .then(function (registry) {           
            return registry.add(transport);
        });  
 }


/**
 * @param {org.zalum.scm.TransferTransportToCarrier} transaction
 * @transaction
 */
function transferTransportToCarrier(transaction){
  transaction.transport.owner = transaction.carrier
  getAssetRegistry('org.zalum.scm.Transport')
        .then(function (registry) {           
            return registry.update(transaction.transport);
        });
}

/**
 * @param {org.zalum.scm.LocateTransport} transaction
 * @transaction
 */
function locateTransport(transaction){
  transaction.transport.location = transaction.location
  getAssetRegistry('org.zalum.scm.Transport')
        .then(function (registry) {           
            return registry.update(transaction.transport);
        });
}
