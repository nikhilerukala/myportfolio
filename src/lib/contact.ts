/** Contact-form validation shared by the client form and the API route. */

export interface ContactInput {
  name: string;
  email: string;
  message: string;
  /** Honeypot — real visitors never see or fill this. */
  company?: string;
}

export type ContactField = 'name' | 'email' | 'message';
export type ContactErrors = Partial<Record<ContactField, string>>;

export const contactLimits = {
  name: { max: 100 },
  email: { max: 254 },
  message: { min: 20, max: 5000 },
} as const;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function normaliseContact(raw: unknown): ContactInput {
  const source = (typeof raw === 'object' && raw !== null ? raw : {}) as Record<string, unknown>;
  const read = (key: string) => (typeof source[key] === 'string' ? (source[key] as string).trim() : '');

  return { name: read('name'), email: read('email'), message: read('message'), company: read('company') };
}

export function validateField(field: ContactField, value: string): string | undefined {
  const trimmed = value.trim();

  switch (field) {
    case 'name':
      if (!trimmed) return 'Enter your name.';
      if (trimmed.length > contactLimits.name.max) return `Keep your name under ${contactLimits.name.max} characters.`;
      return undefined;
    case 'email':
      if (!trimmed) return 'Enter your email address.';
      if (trimmed.length > contactLimits.email.max || !emailPattern.test(trimmed))
        return 'Enter an email address in the format name@example.com.';
      return undefined;
    case 'message':
      if (!trimmed) return 'Enter a message.';
      if (trimmed.length < contactLimits.message.min)
        return `Add a little more detail — at least ${contactLimits.message.min} characters.`;
      if (trimmed.length > contactLimits.message.max)
        return `Keep your message under ${contactLimits.message.max} characters.`;
      return undefined;
  }
}

export function validateContact(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {};
  for (const field of ['name', 'email', 'message'] as const) {
    const error = validateField(field, input[field]);
    if (error) errors[field] = error;
  }
  return errors;
}
