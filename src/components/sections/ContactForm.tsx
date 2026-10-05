'use client';

import { useRef, useState } from 'react';
import clsx from 'clsx';
import { contactLimits, validateContact, validateField, type ContactErrors, type ContactField } from '@/lib/contact';

type Status = { kind: 'idle' } | { kind: 'sending' } | { kind: 'success' } | { kind: 'error'; message: string };

const fields: { name: ContactField; label: string; type: 'text' | 'email' | 'textarea'; autoComplete: string }[] = [
  { name: 'name', label: 'Name', type: 'text', autoComplete: 'name' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  { name: 'message', label: 'Message', type: 'textarea', autoComplete: 'off' },
];

const emptyValues: Record<ContactField, string> = { name: '', email: '', message: '' };

export function ContactForm({ fallbackEmail }: { fallbackEmail: string }) {
  const [values, setValues] = useState(emptyValues);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const formRef = useRef<HTMLFormElement>(null);

  function update(field: ContactField, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    // Once a field has been left, re-validate as the user types so errors clear immediately.
    if (touched[field]) setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
  }

  function blur(field: ContactField) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, values[field]) }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status.kind === 'sending') return;

    const nextErrors = validateContact(values);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, message: true });

    const firstInvalid = fields.find((field) => nextErrors[field.name]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`#contact-${firstInvalid.name}`)?.focus();
      return;
    }

    setStatus({ kind: 'sending' });
    const honeypot = new FormData(event.currentTarget).get('company');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, company: honeypot }),
      });
      const data = (await response.json().catch(() => ({}))) as { error?: string; errors?: ContactErrors };

      if (!response.ok) {
        if (data.errors) setErrors(data.errors);
        throw new Error(data.error ?? 'Something went wrong on my end.');
      }

      setValues(emptyValues);
      setTouched({});
      setErrors({});
      setStatus({ kind: 'success' });
    } catch (error) {
      setStatus({
        kind: 'error',
        message: error instanceof Error ? error.message : 'Something went wrong on my end.',
      });
    }
  }

  const sending = status.kind === 'sending';

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate aria-describedby="contact-form-note" className="grid gap-6">
      <p id="contact-form-note" className="text-sm text-muted">
        All fields are required.
      </p>

      {fields.map((field) => {
        const id = `contact-${field.name}`;
        const errorId = `${id}-error`;
        const error = touched[field.name] ? errors[field.name] : undefined;
        const shared = {
          id,
          name: field.name,
          value: values[field.name],
          required: true,
          autoComplete: field.autoComplete,
          'aria-invalid': error ? true : undefined,
          'aria-describedby': error ? errorId : undefined,
          maxLength: contactLimits[field.name].max,
          onBlur: () => blur(field.name),
          className: clsx(
            'w-full rounded-md border bg-surface px-4 py-3 text-base text-fg transition-colors placeholder:text-muted',
            error ? 'border-accent-ink' : 'border-control',
          ),
        };

        return (
          <div key={field.name} className="grid gap-2">
            <label htmlFor={id} className="text-sm font-medium">
              {field.label}
            </label>
            {field.type === 'textarea' ? (
              <textarea {...shared} rows={6} onChange={(e) => update(field.name, e.target.value)} />
            ) : (
              <input {...shared} type={field.type} onChange={(e) => update(field.name, e.target.value)} />
            )}
            {error && (
              <p id={errorId} className="flex items-start gap-2 text-sm text-accent-ink">
                <span aria-hidden="true" className="font-mono">
                  !
                </span>
                {error}
              </p>
            )}
          </div>
        );
      })}

      {/* Honeypot: hidden from people and assistive tech, attractive to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-company">Company</label>
        <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="btn-primary px-6 disabled:opacity-70"
          disabled={sending}
          aria-disabled={sending}
        >
          {sending ? 'Sending…' : 'Send message'}
        </button>

        <p role="status" aria-live="polite" className="text-sm">
          {status.kind === 'success' && (
            <span>Thanks — your message is on its way. I’ll reply within two working days.</span>
          )}
          {status.kind === 'error' && (
            <span className="text-accent-ink">
              {status.message} You can also email me directly at{' '}
              <a className="link" href={`mailto:${fallbackEmail}`}>
                {fallbackEmail}
              </a>
              .
            </span>
          )}
        </p>
      </div>
    </form>
  );
}
