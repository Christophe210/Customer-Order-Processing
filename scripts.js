class Order {
    constructor(orderId, customerName, orderDate, totalAmount) {
        this.orderId = orderId;
        this.customerName = customerName;
        this.orderDate = orderDate;
        this.totalAmount = totalAmount;
    }
}

function selectionSortOrders(orders, key='orderId', ascending=true) {
    const n = orders.length;
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            if (ascending ? orders[j][key] < orders[minIndex][key] : orders[j][key] > orders[minIndex][key]) {
                minIndex = j;
            }
        }
        if (i !== minIndex) {
            [orders[i], orders[minIndex]] = [orders[minIndex], orders[i]];
        }
    }
    return orders;
}

const orders = []; // Array to hold order records

// Function to add a new order
function addOrder() {
    const orderId = parseInt(document.getElementById('order-id').value);
    const customerName = document.getElementById('customer-name').value.trim();
    const orderDate = document.getElementById('order-date').value;
    const totalAmount = parseFloat(document.getElementById('total-amount').value);

    if (orderId && customerName && orderDate && !isNaN(totalAmount)) {
        const newOrder = new Order(orderId, customerName, orderDate, totalAmount);
        orders.push(newOrder);
        selectionSortOrders(orders, 'orderId', true);
        displayOrders(orders);
        // Clear input fields after adding order
        document.getElementById('order-id').value = '';
        document.getElementById('customer-name').value = '';
        document.getElementById('order-date').value = '';
        document.getElementById('total-amount').value = '';
    } else {
        alert("Please fill in all fields with valid data.");
    }
}

// Function to display sorted orders
function displayOrders(orders) {
    const orderList = document.getElementById('order-list');
    orderList.innerHTML = ''; // Clear existing content
    orders.forEach(order => {
        const orderInfo = document.createElement('div');
        orderInfo.innerHTML = `
            <p><strong>Order ID:</strong> ${order.orderId}</p>
            <p><strong>Customer Name:</strong> ${order.customerName}</p>
            <p><strong>Order Date:</strong> ${order.orderDate}</p>
            <p><strong>Total Amount:</strong> $${order.totalAmount.toFixed(2)}</p>
            <hr>
        `;
        orderList.appendChild(orderInfo);
    });
}

// Get the "Add Order" button by id
const addOrderBtn = document.getElementById('add-order-btn');

// Add event listener to the "Add Order" button
addOrderBtn.addEventListener('click', addOrder);
