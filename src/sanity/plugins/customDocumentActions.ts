import { definePlugin } from 'sanity';
import type { DocumentActionComponent } from 'sanity';
import { toast } from 'sonner';

export const SendNotificationEmailAction: DocumentActionComponent = (props) => {
    const { published, draft } = props;
    const doc = draft || published;

    const isFreeApproved = doc?.pricePlan === 'free' && doc.freePlanStatus === 'approved';
    const isFreeRejected = doc?.pricePlan === 'free' && doc.freePlanStatus === 'rejected';

    return {
        label: 'Send notification email',
        icon: () => '📤',
        disabled: !isFreeApproved && !isFreeRejected,
        onHandle: async () => {
            if (!doc) {
                console.error('SendNotificationEmailAction, no document found');
                return;
            }

            const sendEmailPromise = new Promise(async (resolve, reject) => {
                try {
                    const response = await fetch('/api/send-email', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            itemId: doc._id
                        })
                    });

                    if (!response.ok) {
                        console.error('SendNotificationEmailAction, failed to send email');
                        reject('Failed to send email');
                    }

                    const data = await response.json();
                    resolve(data.message);
                } catch (error) {
                    console.error('Error sending notification email:', error);
                    reject('Failed to send notification email. Please try again.');
                }
            });

            toast.promise(sendEmailPromise, {
                loading: 'Sending email...',
                success: (message) => `${message}`,
                error: (message) => `${message}`,
            });
        },
    }
}

export const customDocumentActionsPlugin = definePlugin({
    name: 'custom-document-actions',
    document: {
        actions: (prev, context) => {
            if (context.schemaType === 'item') {
                return [...prev, SendNotificationEmailAction]
            }
            return prev
        }
    }
})