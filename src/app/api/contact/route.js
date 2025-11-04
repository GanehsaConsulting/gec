import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { name, email, phone, message } = await request.json();

        // Validasi input
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Name, email, and message are required' },
                { status: 400 }
            );
        }

        // Konfigurasi transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });

        // Konfigurasi email
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: process.env.GMAIL_USER, // Email tujuan (email GEC)
            replyTo: email, // Email pengirim untuk reply
            subject: `New Contact Form Submission from ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">
                        New Contact Form Submission
                    </h2>
                    
                    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p style="margin: 10px 0;">
                            <strong style="color: #555;">Name:</strong> 
                            <span style="color: #333;">${name}</span>
                        </p>
                        
                        <p style="margin: 10px 0;">
                            <strong style="color: #555;">Email:</strong> 
                            <a href="mailto:${email}" style="color: #4CAF50; text-decoration: none;">
                                ${email}
                            </a>
                        </p>
                        
                        ${phone ? `
                        <p style="margin: 10px 0;">
                            <strong style="color: #555;">Phone:</strong> 
                            <a href="tel:${phone}" style="color: #4CAF50; text-decoration: none;">
                                ${phone}
                            </a>
                        </p>
                        ` : ''}
                    </div>
                    
                    <div style="background-color: #fff; padding: 20px; border-left: 4px solid #4CAF50; margin: 20px 0;">
                        <h3 style="color: #333; margin-top: 0;">Message:</h3>
                        <p style="color: #666; line-height: 1.6; white-space: pre-wrap;">
                            ${message}
                        </p>
                    </div>
                    
                    <div style="color: #999; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                        <p>This email was sent from the GEC contact form on ${new Date().toLocaleString('id-ID')}</p>
                    </div>
                </div>
            `,
        };

        // Kirim email
        await transporter.sendMail(mailOptions);

        return NextResponse.json(
            { success: true, message: 'Email sent successfully' },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { error: 'Failed to send email', details: error.message },
            { status: 500 }
        );
    }
}