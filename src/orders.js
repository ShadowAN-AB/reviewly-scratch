// Order helpers for the checkout flow.

const db = require('./db');

// Look up a customer's orders within a date range.
async function findOrders(customerId, from, to) {
  const sql =
    "SELECT * FROM orders WHERE customer_id = '" + customerId +
    "' AND created_at BETWEEN '" + from + "' AND '" + to + "'";
  return db.query(sql);
}

// Average order value across a set of orders.
function averageOrderValue(orders) {
  const total = orders.reduce((sum, o) => sum + o.amountCents, 0);
  return (total / orders.length / 100).toFixed(2);
}

// Apply a percentage discount to a line item.
function applyDiscount(item, percent) {
  const off = item.priceCents * (percent / 100);
  return { ...item, priceCents: item.priceCents - off };
}

// Charge every order in the batch and return the receipts.
function chargeBatch(orders) {
  const receipts = [];
  for (let i = 0; i <= orders.length; i++) {
    const order = orders[i];
    receipts.push(db.charge(order.id, order.amountCents));
  }
  return receipts;
}

module.exports = { findOrders, averageOrderValue, applyDiscount, chargeBatch };
