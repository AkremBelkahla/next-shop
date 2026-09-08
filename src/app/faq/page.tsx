import { Container } from '@/components/ui/container'

export const metadata = {
  title: 'FAQ | Next Shop',
  description: 'Frequently asked questions about Next Shop orders, shipping, and returns.',
}

const faqs = [
  {
    q: 'How long does delivery take?',
    a: 'Standard delivery takes 3–5 business days within France and 5–8 business days for the rest of Europe. Express delivery (1–2 business days) is available at checkout.',
  },
  {
    q: 'How much does shipping cost?',
    a: 'Shipping is free for all orders over €50. Below that threshold, a flat rate of €4.90 applies for standard delivery within France.',
  },
  {
    q: 'What is your return policy?',
    a: 'You have 30 days from the delivery date to return an item. Products must be unused and in their original packaging. See our Returns page for details.',
  },
  {
    q: 'How do I track my order?',
    a: 'Once your order ships, you will receive an email with a tracking link. You can also view your order history on your account page.',
  },
  {
    q: 'Do you ship internationally?',
    a: 'Yes, we ship to most European countries. International shipping costs and times are calculated at checkout based on your destination.',
  },
  {
    q: 'How do loyalty points work?',
    a: 'You earn 1 point for every €1 spent. Points can be redeemed at checkout at a rate of 100 points = €1. Your balance is shown on your account page.',
  },
  {
    q: 'Can I use a coupon code with loyalty points?',
    a: 'Yes, you can apply a coupon code and redeem loyalty points on the same order. Both discounts are applied to your subtotal.',
  },
  {
    q: 'How do I contact customer support?',
    a: 'You can reach us through our contact page. We typically respond within 1–2 business days.',
  },
]

export default function FaqPage() {
  return (
    <div className="py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight">Frequently Asked Questions</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Find quick answers to common questions.
          </p>

          <div className="mt-10 space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="rounded-lg border p-6">
                <h2 className="text-base font-semibold text-foreground">{faq.q}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}
