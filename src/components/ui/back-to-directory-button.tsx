'use client';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from './button';

export default function BackToDirectoryButton() {
  const router = useRouter();

  return (
    <Button variant="outline" size="sm" onClick={() => router.back()}>
      <ArrowLeft className="mr-2 h-4 w-4" />
      Back to Directory
    </Button>
  );
}
