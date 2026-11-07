import { Form, Head, setLayoutProps } from '@inertiajs/react';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { useMemo, useState } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp';
import { OTP_MAX_LENGTH } from '@/hooks/use-two-factor-auth';
import { useCustomizePreferences } from '@/hooks/use-customize-preferences';
import { useTranslations, type TranslationKey } from '@/i18n';
import { store } from '@/routes/two-factor/login';

export default function TwoFactorChallenge() {
    const [showRecoveryInput, setShowRecoveryInput] = useState<boolean>(false);
    const [code, setCode] = useState<string>('');
    const { language } = useCustomizePreferences();
    const t = useTranslations(language);

    const authConfigContent = useMemo<{
        title: TranslationKey;
        description: TranslationKey;
        toggleText: TranslationKey;
    }>(() => {
        if (showRecoveryInput) {
            return {
                title: 'recoveryCode',
                description: 'recoveryCodeDescription',
                toggleText: 'loginUsingAuthCode',
            };
        }

        return {
            title: 'authCode',
            description: 'authCodeDescription',
            toggleText: 'loginUsingRecoveryCode',
        };
    }, [showRecoveryInput]);

    setLayoutProps({
        title: t(authConfigContent.title),
        description: t(authConfigContent.description),
    });

    const toggleRecoveryMode = (clearErrors: () => void): void => {
        setShowRecoveryInput(!showRecoveryInput);
        clearErrors();
        setCode('');
    };

    return (
        <>
            <Head title={t('twoFactor')} />

            <Form
                {...store.form()}
                className="flex flex-col gap-6"
                resetOnError
                resetOnSuccess={!showRecoveryInput}
            >
                {({ errors, processing, clearErrors }) => (
                    <>
                        {showRecoveryInput ? (
                            <>
                                <Input
                                    name="recovery_code"
                                    type="text"
                                    placeholder={t('enterRecoveryCode')}
                                    autoFocus={showRecoveryInput}
                                    required
                                />
                                <InputError message={errors.recovery_code} />
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center gap-3 text-center">
                                <div className="flex w-full items-center justify-center">
                                    <InputOTP
                                        name="code"
                                        maxLength={OTP_MAX_LENGTH}
                                        value={code}
                                        onChange={(value) => setCode(value)}
                                        disabled={processing}
                                        pattern={REGEXP_ONLY_DIGITS}
                                        autoFocus
                                    >
                                        <InputOTPGroup>
                                            {Array.from(
                                                { length: OTP_MAX_LENGTH },
                                                (_, index) => (
                                                    <InputOTPSlot
                                                        key={index}
                                                        index={index}
                                                    />
                                                ),
                                            )}
                                        </InputOTPGroup>
                                    </InputOTP>
                                </div>
                                <InputError message={errors.code} />
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={processing}
                        >
                            {t('continue')}
                        </Button>

                        <div className="text-center text-sm text-muted-foreground">
                            <span>{t('orYouCan')} </span>
                            <button
                                type="button"
                                className="cursor-pointer text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                onClick={() => toggleRecoveryMode(clearErrors)}
                            >
                                {t(authConfigContent.toggleText)}
                            </button>
                        </div>
                    </>
                )}
            </Form>
        </>
    );
}
