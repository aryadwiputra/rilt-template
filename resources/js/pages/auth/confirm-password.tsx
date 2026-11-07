import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasskeyVerify from '@/components/passkey-verify';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { useCustomizePreferences } from '@/hooks/use-customize-preferences';
import { useTranslations } from '@/i18n';
import { store } from '@/routes/password/confirm';
import {
    index as confirmOptions,
    store as confirmStore,
} from '@/actions/Laravel/Passkeys/Http/Controllers/PasskeyConfirmationController';

export default function ConfirmPassword() {
    const { language } = useCustomizePreferences();
    const t = useTranslations(language);

    return (
        <>
            <Head title={t('confirmPasswordTitle')} />

            <PasskeyVerify
                routes={{
                    options: confirmOptions(),
                    submit: confirmStore(),
                }}
                label={t('confirmWithPasskey')}
                loadingLabel={t('confirming')}
                separator={t('orConfirmWithPassword')}
            />

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-2">
                            <Label htmlFor="password">{t('password')}</Label>
                            <PasswordInput
                                id="password"
                                name="password"
                                placeholder={t('password')}
                                autoComplete="current-password"
                                autoFocus
                            />

                            <InputError message={errors.password} />
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={processing}
                            data-test="confirm-password-button"
                        >
                            {processing && <Spinner />}
                            {t('confirmPassword')}
                        </Button>
                    </>
                )}
            </Form>
        </>
    );
}

ConfirmPassword.layout = {
    title: 'confirmPasswordTitle',
    description: 'confirmPasswordDescription',
};
