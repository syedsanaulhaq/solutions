'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Banknote, Building2, Check, MessageCircle, ShoppingCart } from 'lucide-react';
import { useCart } from '@/lib/cart';
import { formatPKR } from '@/lib/utils';
import { bankTransfer, shippingFor, site, whatsappLink } from '@/lib/site';

type PaymentMethod = 'cod' | 'bank';

export default function CheckoutPage() {
  const { items, subtotal, count, clear } = useCart();
  const shipping = shippingFor(subtotal);
  const total = subtotal + shipping;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [payment, setPayment] = useState<PaymentMethod>('cod');
  const [qrOk, setQrOk] = useState(true);
  const [error, setError] = useState('');

  if (count === 0) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-primary">
          <ShoppingCart className="h-8 w-8" />
        </span>
        <h1 className="mt-6 text-2xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">Add some glasses before checking out.</p>
        <Link
          href="/#categories"
          className="mt-6 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  function buildOrderMessage() {
    const lines: string[] = [];
    lines.push(`*New Order — ${site.name}*`);
    lines.push('');
    lines.push('*Items:*');
    items.forEach(({ product, qty, lineTotal }) => {
      lines.push(`• ${product.name} × ${qty} — ${formatPKR(lineTotal)}`);
    });
    lines.push('');
    lines.push(`Subtotal: ${formatPKR(subtotal)}`);
    lines.push(`Shipping: ${shipping === 0 ? 'Free' : formatPKR(shipping)}`);
    lines.push(`*Total: ${formatPKR(total)}*`);
    lines.push('');
    lines.push(`*Payment:* ${payment === 'cod' ? 'Cash on Delivery' : 'Bank Transfer'}`);
    lines.push('');
    lines.push('*Customer:*');
    lines.push(`Name: ${name}`);
    lines.push(`Phone: ${phone}`);
    lines.push(`City: ${city}`);
    lines.push(`Address: ${address}`);
    if (notes.trim()) lines.push(`Notes: ${notes}`);
    if (payment === 'bank') {
      lines.push('');
      lines.push('(I will send the bank transfer screenshot here.)');
    }
    return lines.join('\n');
  }

  function placeOrder() {
    setError('');
    if (!name.trim() || !phone.trim() || !city.trim() || !address.trim()) {
      setError('Please fill in your name, phone, city and full address.');
      return;
    }
    const url = whatsappLink(buildOrderMessage());
    window.open(url, '_blank', 'noopener,noreferrer');
    clear();
  }

  const inputClass =
    'mt-1 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none ring-primary/30 focus:ring-2';

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
      <p className="mt-2 text-muted-foreground">
        Fill in your details and choose a payment method. Your order is sent to us on WhatsApp to confirm.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Form */}
        <div className="space-y-8 lg:col-span-2">
          {/* Delivery details */}
          <section className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">Delivery Details</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium">
                Full Name *
                <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
              </label>
              <label className="block text-sm font-medium">
                Phone Number *
                <input
                  className={inputClass}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="03XX XXXXXXX"
                  inputMode="tel"
                />
              </label>
              <label className="block text-sm font-medium">
                City *
                <input className={inputClass} value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g. Rawalpindi" />
              </label>
              <label className="block text-sm font-medium sm:col-span-2">
                Full Address *
                <textarea
                  className={inputClass}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House #, street, area, landmark"
                  rows={3}
                />
              </label>
              <label className="block text-sm font-medium sm:col-span-2">
                Order Notes (optional)
                <textarea
                  className={inputClass}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Colour preference, delivery time, etc."
                  rows={2}
                />
              </label>
            </div>
          </section>

          {/* Payment method */}
          <section className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">Payment Method</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setPayment('cod')}
                className={`flex items-start gap-3 rounded-lg border p-4 text-left transition-colors ${
                  payment === 'cod' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-border hover:bg-secondary'
                }`}
              >
                <Banknote className="mt-0.5 h-5 w-5 text-primary" />
                <span>
                  <span className="block text-sm font-semibold">Cash on Delivery</span>
                  <span className="block text-xs text-muted-foreground">Pay cash when your parcel arrives.</span>
                </span>
              </button>
              <button
                type="button"
                onClick={() => setPayment('bank')}
                className={`flex items-start gap-3 rounded-lg border p-4 text-left transition-colors ${
                  payment === 'bank' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-border hover:bg-secondary'
                }`}
              >
                <Building2 className="mt-0.5 h-5 w-5 text-primary" />
                <span>
                  <span className="block text-sm font-semibold">Bank Transfer</span>
                  <span className="block text-xs text-muted-foreground">Transfer to our account or scan the QR.</span>
                </span>
              </button>
            </div>

            {payment === 'bank' && (
              <div className="mt-5 grid gap-5 rounded-lg border border-border bg-secondary/40 p-5 sm:grid-cols-2">
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Bank</dt>
                    <dd className="font-medium">{bankTransfer.bankName}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Account Title</dt>
                    <dd className="font-medium">{bankTransfer.accountTitle}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Account #</dt>
                    <dd className="font-medium">{bankTransfer.accountNumber}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">IBAN</dt>
                    <dd className="break-all font-medium">{bankTransfer.iban}</dd>
                  </div>
                  <p className="pt-2 text-xs text-muted-foreground">
                    After transfer, send the payment screenshot on WhatsApp to confirm your order.
                  </p>
                </dl>
                {bankTransfer.qrImage && qrOk && (
                  <div className="flex flex-col items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={bankTransfer.qrImage}
                      alt="Bank transfer QR code"
                      className="h-40 w-40 rounded-lg border border-border bg-white object-contain p-2"
                      onError={() => setQrOk(false)}
                    />
                    <span className="mt-2 text-xs text-muted-foreground">Scan to pay</span>
                  </div>
                )}
              </div>
            )}
          </section>

          {error && (
            <p className="rounded-lg bg-red-500/10 px-4 py-3 text-sm font-medium text-red-600">{error}</p>
          )}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-20 rounded-xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">Your Order</h2>
            <ul className="mt-4 space-y-3">
              {items.map(({ product, qty, lineTotal }) => (
                <li key={product.slug} className="flex items-center justify-between gap-3 text-sm">
                  <span className="min-w-0">
                    <span className="block truncate font-medium">{product.name}</span>
                    <span className="text-xs text-muted-foreground">Qty {qty}</span>
                  </span>
                  <span className="font-medium">{formatPKR(lineTotal)}</span>
                </li>
              ))}
            </ul>

            <dl className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="font-medium">{formatPKR(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Shipping</dt>
                <dd className="font-medium">{shipping === 0 ? 'Free' : formatPKR(shipping)}</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-3 text-base">
                <dt className="font-semibold">Total</dt>
                <dd className="font-extrabold">{formatPKR(total)}</dd>
              </div>
            </dl>

            <button
              type="button"
              onClick={placeOrder}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              <MessageCircle className="h-4 w-4" /> Place Order on WhatsApp
            </button>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
              <Check className="h-3.5 w-3.5 text-primary" /> 7-day replacement warranty
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
