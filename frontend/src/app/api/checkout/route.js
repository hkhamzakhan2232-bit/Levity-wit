import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
    try {
        const orderData = await request.json();

        // Generate unique order ID
        const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        // Customer confirmation email
        const customerEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; }
          .header { background-color: #d4a5a5; color: white; padding: 30px 20px; text-align: center; }
          .header h1 { margin: 0; font-size: 28px; }
          .content { padding: 30px 20px; background-color: #f9f9f9; }
          .order-details { background-color: white; padding: 20px; margin: 20px 0; border-radius: 8px; }
          .order-details h3 { margin-top: 0; color: #333; }
          .item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
          .item:last-child { border-bottom: none; }
          .total-row { display: flex; justify-content: space-between; padding: 10px 0; font-weight: bold; border-top: 2px solid #333; margin-top: 10px; font-size: 18px; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; background-color: #f9f9f9; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You For Your Order! ✨</h1>
          </div>
          <div class="content">
            <h2 style="color: #333;">Order #${orderId}</h2>
            <p>Hi ${orderData.billingDetails.firstName},</p>
            <p>Thank you for your order! We've received it and will process it shortly.</p>
            
            <div class="order-details">
              <h3>Order Details</h3>
              ${orderData.items.map(item => `
                <div class="item">
                  <span>${item.name} (Size: ${item.size}) × ${item.quantity}</span>
                  <span>$${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              `).join('')}
              <div class="item" style="border-top: 1px solid #eee; margin-top: 10px; padding-top: 10px;">
                <span>Subtotal</span>
                <span>$${orderData.subtotal.toFixed(2)}</span>
              </div>
              <div class="item">
                <span>Shipping</span>
                <span>$${orderData.shipping.toFixed(2)}</span>
              </div>
              <div class="total-row">
                <span>Total</span>
                <span>$${orderData.total.toFixed(2)}</span>
              </div>
            </div>

            <div class="order-details">
              <h3>Billing Information</h3>
              <p style="margin: 5px 0; line-height: 1.8;">
                ${orderData.billingDetails.firstName} ${orderData.billingDetails.lastName}<br>
                ${orderData.billingDetails.streetAddress}<br>
                ${orderData.billingDetails.city}, ${orderData.billingDetails.postcode}<br>
                ${orderData.billingDetails.country}<br>
                Phone: ${orderData.billingDetails.phone}
              </p>
            </div>

            <div class="order-details">
              <h3>Payment Method</h3>
              <p style="margin: 5px 0;">${orderData.paymentMethod === 'bank-transfer' ? 'Direct Bank Transfer' :
                orderData.paymentMethod === 'check' ? 'Check Payments' :
                    orderData.paymentMethod === 'cod' ? 'Cash on Delivery' : 'PayPal'
            }</p>
            </div>

            ${orderData.orderNotes ? `
              <div class="order-details">
                <h3>Order Notes</h3>
                <p style="margin: 5px 0;">${orderData.orderNotes}</p>
              </div>
            ` : ''}

            <p style="margin-top: 30px;">If you have any questions, please don't hesitate to contact us.</p>
            <p style="margin: 5px 0;">Best regards,<br><strong>Levity & Wit Team</strong></p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Levity & Wit. All rights reserved.</p>
            <p>This is an automated email, please do not reply.</p>
          </div>
        </div>
      </body>
      </html>
    `;

        // Admin notification email
        const adminEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; }
          .header { background-color: #333; color: white; padding: 30px 20px; text-align: center; }
          .header h1 { margin: 0; font-size: 28px; }
          .content { padding: 30px 20px; background-color: #f9f9f9; }
          .order-details { background-color: white; padding: 20px; margin: 20px 0; border-radius: 8px; }
          .order-details h3 { margin-top: 0; color: #333; }
          .item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
          .total-row { display: flex; justify-content: space-between; padding: 10px 0; font-weight: bold; border-top: 2px solid #333; margin-top: 10px; font-size: 18px; }
          .info-row { margin: 8px 0; }
          .label { font-weight: bold; color: #555; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 New Order Received!</h1>
          </div>
          <div class="content">
            <h2 style="color: #333;">Order #${orderId}</h2>
            <div class="info-row">
              <span class="label">Date:</span> ${new Date(orderData.orderDate).toLocaleString()}
            </div>
            
            <div class="order-details">
              <h3>Customer Information</h3>
              <div class="info-row"><span class="label">Name:</span> ${orderData.billingDetails.firstName} ${orderData.billingDetails.lastName}</div>
              <div class="info-row"><span class="label">Email:</span> ${orderData.billingDetails.email}</div>
              <div class="info-row"><span class="label">Phone:</span> ${orderData.billingDetails.phone}</div>
              ${orderData.billingDetails.companyName ? `<div class="info-row"><span class="label">Company:</span> ${orderData.billingDetails.companyName}</div>` : ''}
            </div>

            <div class="order-details">
              <h3>Shipping Address</h3>
              <p style="margin: 5px 0; line-height: 1.8;">
                ${orderData.billingDetails.streetAddress}<br>
                ${orderData.billingDetails.city}, ${orderData.billingDetails.postcode}<br>
                ${orderData.billingDetails.country}
              </p>
            </div>

            <div class="order-details">
              <h3>Order Items</h3>
              ${orderData.items.map(item => `
                <div class="item">
                  <span>${item.name} (Size: ${item.size}) × ${item.quantity}</span>
                  <span>$${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              `).join('')}
              <div class="item" style="border-top: 1px solid #eee; margin-top: 10px; padding-top: 10px;">
                <span>Subtotal</span>
                <span>$${orderData.subtotal.toFixed(2)}</span>
              </div>
              <div class="item">
                <span>Shipping</span>
                <span>$${orderData.shipping.toFixed(2)}</span>
              </div>
              <div class="total-row">
                <span>Total</span>
                <span>$${orderData.total.toFixed(2)}</span>
              </div>
            </div>

            <div class="order-details">
              <h3>Payment Method</h3>
              <p style="margin: 5px 0;">${orderData.paymentMethod === 'bank-transfer' ? 'Direct Bank Transfer' :
                orderData.paymentMethod === 'check' ? 'Check Payments' :
                    orderData.paymentMethod === 'cod' ? 'Cash on Delivery' : 'PayPal'
            }</p>
            </div>

            ${orderData.orderNotes ? `
              <div class="order-details">
                <h3>Order Notes</h3>
                <p style="margin: 5px 0; background: #fff9e6; padding: 15px; border-left: 3px solid #ffc107;">${orderData.orderNotes}</p>
              </div>
            ` : ''}
          </div>
        </div>
      </body>
      </html>
    `;

        // Send customer email
        await resend.emails.send({
            from: 'Levity & Wit <onboarding@resend.dev>', // Use resend's test email or your verified domain
            to: orderData.billingDetails.email,
            subject: `Order Confirmation - ${orderId}`,
            html: customerEmailHtml,
        });

        // Send admin notification
        await resend.emails.send({
            from: 'Levity & Wit <onboarding@resend.dev>',
            to: process.env.ADMIN_EMAIL || 'your-email@gmail.com', // Your personal email
            subject: `New Order - ${orderId}`,
            html: adminEmailHtml,
        });

        // Optional: Save to database here
        // await saveOrderToDatabase(orderId, orderData);

        return NextResponse.json({
            success: true,
            orderId: orderId,
            message: 'Order placed successfully',
        });

    } catch (error) {
        console.error('Checkout error:', error);
        return NextResponse.json(
            { error: 'Failed to process order', details: error.message },
            { status: 500 }
        );
    }
}
