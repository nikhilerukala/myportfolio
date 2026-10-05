import Link from 'next/link';
import { Container } from '@/components/ui/Container';

export default function NotFound() {
  return (
    <Container className="py-24 sm:py-32">
      <p className="font-mono text-sm text-muted">404</p>
      <h1 className="mt-4 text-h2 font-semibold">This page doesn’t exist.</h1>
      <p className="mt-4 text-lg text-muted">The link may be outdated, or the address mistyped.</p>
      <Link href="/" className="btn-secondary mt-8 px-6">
        Back to home
      </Link>
    </Container>
  );
}
