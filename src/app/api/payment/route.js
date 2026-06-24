import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe';
import { auth } from '@/lib/auth';



export async function POST(request) {
    try {
        const headersList = await headers()
        const origin = headersList.get('origin')

        const userSession = await auth.api.getSession({
            headers: await headers(),
        })
        const user = userSession?.user

        const formData = await request.formData()
        const bookId = formData.get('bookId')
        const title = formData.get('title')
        const cover = formData.get('cover')
        const fee = formData.get('fee')
        const librarianId = formData.get('librarianId')
        const librarianEmail = formData.get('librarianEmail')
        const userId = formData.get('userId')
        const userEmail = formData.get('userEmail')

        // পেমেন্ট কমপ্লিট হওয়ার পর ডাটাবেজে deliveries নামে নতুন কালেকশনে উপরের সব ডাটা জমা হবে এবং স্ট্যাটাস হবে Pending। এবার মিলিয়ে নিন ভাই, এই এক পেমেন্টের ডাটা আপনার ড্যাশবোর্ডের কোথায় কোথায় গিয়ে হিট করবে:


        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            customer_email: user?.email,
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: title,
                            images: [cover],
                        },
                        unit_amount: Math.round(fee * 100),
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                bookId: bookId,
                title: title,
                cover: cover,
                fee: Number(fee),
                librarianId: librarianId,
                librarianEmail: librarianEmail,
                userId: userId,
                userEmail: userEmail,
            },

            mode: 'payment',
            success_url: `${origin}/pricing/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        });
        return NextResponse.redirect(session.url, 303)
    } catch (err) {
        return NextResponse.json(
            { error: err.message },
            { status: err.statusCode || 500 }
        )
    }
}