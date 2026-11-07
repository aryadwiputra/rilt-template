import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { useCustomizePreferences } from '@/hooks/use-customize-preferences';
import { useTranslations } from '@/i18n';
import { update } from '@/routes/password';

type Props = {
    token: string;
    email: string;
    passwordRules: string;
};

export default function ResetPassword({ token, email, passwordRules }: Props) {
    const { language } = useCustomizePreferences();
    const t = useTranslations(language);

    return (
        <>
            <Head title={t('resetPasswordTitle')} />

            <Form
                {...update.form()}
                transform={(data) => ({ ...data, token, email })}
                resetOnSuccess={['password', 'password_confirmation']}
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-2">
                            <Label htmlFor="email">{t('emailAddress')}</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                autoComplete="email"
                                value={email}
                                readOnly
                            />
                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password">{t('password')}</Label>
                            <PasswordInput
                                id="password"
                                name="password"
                                autoComplete="new-password"
                                autoFocus
                                placeholder={t('password')}
                                passwordrules={passwordRules}
                            />
                            <InputError message={errors.password} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password_confirmation">
                                {t('confirmPassword')}
                            </Label>
                            <PasswordInput
                                id="password_confirmation"
                                name="password_confirmation"
                                autoComplete="new-password"
                                placeholder={t('confirmPassword')}
                                passwordrules={passwordRules}
                            />
                            <InputError
                                message={errors.password_confirmation}
                                className="mt-2"
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={processing}
                            data-test="reset-password-button"
                        >
                            {processing && <Spinner />}
                            {t('resetPassword')}
                        </Button>
                    </>
                )}
            </Form>
        </>
    );
}

ResetPassword.layout = {
    title: 'resetPasswordTitle',
    description: 'resetPasswordDescription',
};
