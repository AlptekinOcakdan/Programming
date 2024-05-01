export const orderPdf = (data) => {
    return `<!DOCTYPE html>
<html>
<head>
    <title>Order Summary</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }

        .header {
            text-align: center;
        }

        .content {
            margin: 20px;
        }

        .order-info, .user-info, .product-list {
            margin-bottom: 20px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
        }

        .total {
            text-align: right;
        }

        .logo {
            width: 200px; /* Adjust as needed */
        }
    </style>
</head>
<body>
<div class="header">
    <h1> Order Summary</h1>
</div>

<div class="content">
    <div class="user-info">
        <h2>User Information</h2>
        <p><strong>Name:</strong> ${data.user.name}</p>
        <p><strong>Surname:</strong> ${data.user.surname}</p>
        <p><strong>Email:</strong> ${data.user.email}</p>
        <p><strong>Contact:</strong> ${data.user.contact}</p>
    </div>

    <div class="order-info">
        <h2>Order Information</h2>
        <p><strong>Shipping Address:</strong> ${data.order.shippingAddress}</p>
        <p><strong>Order Bill:</strong> $ ${data.order.bill}</p>
        <p><strong>Schedule:</strong> ${data.order.schedule}</p>
        <p><strong>Order Date:</strong> ${data.order.date}</p>
    </div>

    <div class="product-list">
        <h2>Products</h2>
        <table>
            <tr>
                <th>Quantity</th>
                <th>Product</th>
                <th>Price</th>
            </tr>
            ${data.order.products.map(product => `
                <tr>
                    <td>(${product.quantity})</td>
                <td>${product.name}</td>
                <td>$ ${product.price}</td>
            </tr>
        `).join('')}
    </table>
</div>
    
</div>
</body>
</html>`
};