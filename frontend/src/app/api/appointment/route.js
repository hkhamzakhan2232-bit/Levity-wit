import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend('re_Lrr4Vzoe_5WbMbcX2Z9dUzdkney1MSmr5')

export async function POST(request) {
  try {
    const body = await request.json()
    const { fullName, email, message } = body

    const bookingId = `APT-${Date.now()}-${Math.floor(Math.random() * 1000)}`

    const customerHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charSet="utf-8" />
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; }
          .header { background-color: #d4a5a5; color: white; padding: 28px 20px; text-align: center; }
          .content { padding: 28px 20px; background-color: #f9f9f9; }
          .card { background-color: white; padding: 18px; margin: 18px 0; border-radius: 8px; }
          .footer { text-align: center; padding: 18px; color: #666; font-size: 12px; background-color: #f9f9f9; }
          .row { margin: 6px 0; }
          .label { font-weight: bold; color: #555; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Appointment Request Received</h1>
          </div>
          <div class="content">
            <p>Hi ${fullName},</p>
            <p>Thanks for booking your appointment with Levity & Wit. Our team will review your request and follow up shortly to confirm the date and time.</p>
            <div class="card">
              <div class="row"><span class="label">Reference:</span> ${bookingId}</div>
              <div class="row"><span class="label">Name:</span> ${fullName}</div>
              <div class="row"><span class="label">Email:</span> ${email}</div>
              ${message ? `<div class="row"><span class="label">Message:</span> ${message}</div>` : ''}
            </div>
            <p>If you need to update any details, just reply to this email.</p>
            <p>Best regards,<br><strong>Levity & Wit Team</strong></p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Levity & Wit. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `

    const adminHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charSet="utf-8" />
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; }
          .header { background-color: #333; color: white; padding: 28px 20px; text-align: center; }
          .content { padding: 28px 20px; background-color: #f9f9f9; }
          .card { background-color: white; padding: 18px; margin: 18px 0; border-radius: 8px; }
          .row { margin: 6px 0; }
          .label { font-weight: bold; color: #555; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Appointment Request</h1>
          </div>
          <div class="content">
            <div class="card">
              <div class="row"><span class="label">Reference:</span> ${bookingId}</div>
              <div class="row"><span class="label">Name:</span> ${fullName}</div>
              <div class="row"><span class="label">Email:</span> ${email}</div>
              ${message ? `<div class="row"><span class="label">Message:</span> ${message}</div>` : ''}
            </div>
          </div>
        </div>
      </body>
      </html>
    `

    await resend.emails.send({
      from: 'Levity & Wit <onboarding@resend.dev>',
      to: email,
      subject: `We received your appointment request (${bookingId})`,
      html: customerHtml
    })

    await resend.emails.send({
      from: 'Levity & Wit <onboarding@resend.dev>',
      to: process.env.ADMIN_EMAIL || 'your-email@gmail.com',
      subject: `New appointment request (${bookingId})`,
      html: adminHtml
    })

    return NextResponse.json({ success: true, bookingId })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send appointment email', details: error.message }, { status: 500 })
  }
}
