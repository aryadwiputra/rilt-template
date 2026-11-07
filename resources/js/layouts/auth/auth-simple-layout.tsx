import { Languages, Moon } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppearance } from '@/hooks/use-appearance';
import { useCustomizePreferences } from '@/hooks/use-customize-preferences';
import { useTranslations, type TranslationKey } from '@/i18n';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    const { name } = usePage().props;
    const { appearance, resolvedAppearance, updateAppearance } =
        useAppearance();
    const preferences = useCustomizePreferences();
    const t = useTranslations(preferences.language);

    const heading = title ? t(title as TranslationKey) : undefined;
    const subheading = description
        ? t(description as TranslationKey)
        : undefined;

    return (
        <div className="flex min-h-svh bg-background">
            <aside className="relative hidden flex-col overflow-hidden bg-foreground p-10 text-background lg:flex xl:p-14">
                <AppLogoIcon
                    aria-hidden
                    className="pointer-events-none absolute -right-24 -bottom-24 size-[480px] fill-current opacity-[0.06]"
                />
                <Link
                    href={home()}
                    className="relative z-10 flex items-center gap-3 font-semibold"
                >
                    <span className="flex size-9 items-center justify-center rounded-md bg-background text-foreground">
                        <AppLogoIcon className="size-5 fill-current" />
                    </span>
                    {name}
                </Link>
                <div className="relative z-10 my-auto flex max-w-md flex-col gap-4">
                    <p className="text-2xl leading-tight font-semibold tracking-tight text-balance">
                        {t('authBrandTitle')}
                    </p>
                    <p className="text-sm leading-relaxed opacity-75">
                        {t('authBrandDescription')}
                    </p>
                </div>
                <div className="relative z-10 text-xs opacity-60">
                    © {new Date().getFullYear()} {name}
                </div>
            </aside>
            <main className="relative flex min-h-svh flex-1 flex-col items-center justify-center px-6 py-10">
                <div className="flex w-full max-w-sm flex-col gap-8">
                    <Link
                        href={home()}
                        className="flex justify-center lg:hidden"
                    >
                        <span className="flex size-10 items-center justify-center rounded-md bg-foreground text-background">
                            <AppLogoIcon className="size-6 fill-current" />
                        </span>
                    </Link>
                    {(heading || subheading) && (
                        <div className="space-y-2 text-center">
                            {heading && (
                                <h1 className="text-xl font-semibold tracking-tight">
                                    {heading}
                                </h1>
                            )}
                            {subheading && (
                                <p className="text-sm text-muted-foreground">
                                    {subheading}
                                </p>
                            )}
                        </div>
                    )}
                    {children}
                </div>
                <div className="absolute right-6 bottom-6 flex items-center gap-1">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="size-8"
                                aria-label={t('language')}
                            >
                                <Languages className="size-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {(['en', 'de', 'fr'] as const).map((lang) => (
                                <DropdownMenuItem
                                    key={lang}
                                    onClick={() =>
                                        preferences.updatePreferences({
                                            language: lang,
                                        })
                                    }
                                >
                                    {t(
                                        lang === 'en'
                                            ? 'english'
                                            : lang === 'de'
                                              ? 'deutsch'
                                              : 'francais',
                                    )}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="size-8"
                        aria-label={t('theme')}
                        onClick={() =>
                            updateAppearance(
                                appearance === 'system'
                                    ? 'dark'
                                    : resolvedAppearance === 'dark'
                                      ? 'light'
                                      : 'dark',
                            )
                        }
                    >
                        <Moon className="size-4" />
                    </Button>
                </div>
            </main>
        </div>
    );
}
