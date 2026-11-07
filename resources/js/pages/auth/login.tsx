import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import AuthStatus from '@/components/auth-status';
import PasskeyVerify from '@/components/passkey-verify';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { useCustomizePreferences } from '@/hooks/use-customize-preferences';
import { useTranslations } from '@/i18n';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
};

export default function Login({ status, canResetPassword }: Props) {
    const { language } = useCustomizePreferences();
    const t = useTranslations(language);

    return (
        <>
            <Head title={t('logIn')} />

            <PasskeyVerify
                label={t('signInWithPasskey')}
                loadingLabel={t('authenticating')}
                separator={t('orContinueWithEmail')}
            />

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">
                                    {t('emailAddress')}
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    placeholder="email@example.com"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">
                                        {t('password')}
                                    </Label>
                                    {canResetPassword && (
                                        <TextLink
                                            href={request()}
                                            className="ml-auto text-sm"
                                            tabIndex={5}
                                        >
                                            {t('forgotPassword')}
                                        </TextLink>
                                    )}
                                </div>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder={t('password')}
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center space-x-3">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    tabIndex={3}
                                />
                                <Label htmlFor="remember">
                                    {t('rememberMe')}
                                </Label>
                            </div>

                            <Button
                                type="submit"
                                className="mt-2 w-full"
                                tabIndex={4}
                                disabled={processing}
                                data-test="login-button"
                            >
                                {processing && <Spinner />}
                                {t('logIn')}
                            </Button>
                        </div>

                        <div className="text-center text-sm text-muted-foreground">
                            {t('noAccount')}{' '}
                            <TextLink href={register()} tabIndex={5}>
                                {t('signUp')}
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>

            {status && <AuthStatus message={status} />}
        </>
    );
}

Login.layout = {
    title: 'loginTitle',
    description: 'loginDescription',
};
