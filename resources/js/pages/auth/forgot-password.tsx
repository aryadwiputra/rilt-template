import { Form, Head } from '@inertiajs/react';
import AuthStatus from '@/components/auth-status';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { useCustomizePreferences } from '@/hooks/use-customize-preferences';
import { useTranslations } from '@/i18n';
import { login } from '@/routes';
import { email } from '@/routes/password';

export default function ForgotPassword({ status }: { status?: string }) {
    const { language } = useCustomizePreferences();
    const t = useTranslations(language);

    return (
        <>
            <Head title={t('forgotPasswordTitle')} />

            {status && <AuthStatus message={status} />}

            <Form {...email.form()} className="flex flex-col gap-6">
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-2">
                            <Label htmlFor="email">{t('emailAddress')}</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                autoComplete="off"
                                autoFocus
                                placeholder="email@example.com"
                            />

                            <InputError message={errors.email} />
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={processing}
                            data-test="email-password-reset-link-button"
                        >
                            {processing && <Spinner />}
                            {t('emailPasswordResetLink')}
                        </Button>
                    </>
                )}
            </Form>

            <div className="space-x-1 text-center text-sm text-muted-foreground">
                <span>{t('orReturnTo')}</span>
                <TextLink href={login()}>{t('loginLink')}</TextLink>
            </div>
        </>
    );
}

ForgotPassword.layout = {
    title: 'forgotPasswordTitle',
    description: 'forgotPasswordDescription',
};
