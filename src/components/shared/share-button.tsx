'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';

export default function ShareButton() {
  const [shareStatus, setShareStatus] = useState<{
    message: string;
    copied: boolean;
  }>({ message: '', copied: false });

  const handleShare = async () => {
    const shareData = {
      title: 'Tailwind CSS: Revolutionizing Web Development',
      text: 'Check out this amazing product for customer engagement solutions!',
      url: window.location.href,
    };

    try {
      const isInIframe = window !== window.parent;

      if (
        !isInIframe &&
        navigator.share &&
        typeof navigator.canShare === 'function' &&
        navigator.canShare(shareData)
      ) {
        await navigator.share(shareData);
        setShareStatus({ message: 'Shared successfully!', copied: false });
      } else {
        await navigator.clipboard.writeText(
          `${shareData.title} - ${shareData.text} ${shareData.url}`
        );
        setShareStatus({ message: 'Link copied to clipboard!', copied: true });
      }
    } catch (err) {
      console.error('Error sharing:', err);
      try {
        await navigator.clipboard.writeText(
          `${shareData.title} - ${shareData.text} ${shareData.url}`
        );
        setShareStatus({ message: 'Link copied to clipboard!', copied: true });
      } catch (clipboardErr) {
        setShareStatus({
          message: 'Unable to share or copy link',
          copied: false,
        });
      }
    }

    setTimeout(() => {
      setShareStatus({ message: '', copied: false });
    }, 2000);
  };

  return (
    <div className="relative">
      <Button
        onClick={handleShare}
        variant="outline"
        size="sm"
        className="flex items-center gap-2 cursor-pointer"
      >
        <Share2 className="h-4 w-4" />
        <span>Share</span>
      </Button>
      {shareStatus.message && (
        <div className="absolute -bottom-8 right-0 whitespace-nowrap rounded bg-background px-2 py-1 text-xs shadow-md border">
          {shareStatus.message}
        </div>
      )}
    </div>
  );
}
