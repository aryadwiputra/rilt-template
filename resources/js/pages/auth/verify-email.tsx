import { Form, Head } from '@inertiajs/react';
import AuthStatus from '@/components/auth-status';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useCustomizePreferences } from '@/hooks/use-customize-preferences';
import { useTranslations } from '@/i18n';
import { logout } from '@/routes';
import { send } from '@/routes/verification';

export default function VerifyEmail({ status }: { status?: string }) {
    const { language } = useCustomizePreferences();
    const t = useTranslations(language);

    return (
        <>
            <Head title={t('verifyEmailTitle')} />

            {status === 'verification-link-sent' && (
                <AuthStatus message={t('verificationLinkSent')} />
            )}

            <Form {...send.form()} className="flex flex-col gap-6">
                {({ processing }) => (
                    <>
                        <Button
                            disabled={processing}
                            variant="secondary"
                            className="w-full"
                        >
                            {processing && <Spinner />}
                            {t('resendVerificationEmail')}
                        </Button>

                        <TextLink
                            href={logout()}
                            className="mx-auto block text-sm"
                        >
                            {t('logOut')}
                        </TextLink>
                    </>
                )}
            </Form>
        </>
    );
}

VerifyEmail.layout = {
    title: 'verifyEmailTitle',
    description: 'verifyEmailDescription',
};
