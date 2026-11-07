import { Head } from '@inertiajs/react';
import {
    ArrowDownRight,
    ArrowUpRight,
    Check,
    ChevronRight,
    MoreHorizontal,
    Plus,
} from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { useCustomizePreferences } from '@/hooks/use-customize-preferences';
import { useTranslations } from '@/i18n';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { dashboard } from '@/routes';

type Translator = ReturnType<typeof useTranslations>;

type Metric = {
    label: 'totalRevenue' | 'activeUsers' | 'totalOrders' | 'pageViews';
    value: string;
    change: string;
    positive: boolean;
};

const metrics: Metric[] = [
    {
        label: 'totalRevenue',
        value: '$48,295',
        change: '+12.5%',
        positive: true,
    },
    { label: 'activeUsers', value: '2,847', change: '+8.2%', positive: true },
    { label: 'totalOrders', value: '1,432', change: '-3.1%', positive: false },
    { label: 'pageViews', value: '284K', change: '+24.7%', positive: true },
];

const chartData = [42, 56, 48, 68, 60, 78, 66, 88, 75, 96, 84, 100];
const orders = [
    {
        customer: 'Olivia Martin',
        id: '#ORD-7291',
        product: 'Pro subscription',
        status: 'Paid',
        amount: '$249.00',
    },
    {
        customer: 'Jackson Lee',
        id: '#ORD-7289',
        product: 'Team plan',
        status: 'Pending',
        amount: '$129.00',
    },
    {
        customer: 'Isabella Nguyen',
        id: '#ORD-7286',
        product: 'Starter plan',
        status: 'Paid',
        amount: '$49.00',
    },
    {
        customer: 'William Kim',
        id: '#ORD-7281',
        product: 'Pro subscription',
        status: 'Refunded',
        amount: '$249.00',
    },
];

function MetricCard({ metric, t }: { metric: Metric; t: Translator }) {
    return (
        <Card className="gap-3 py-5 shadow-none">
            <CardHeader className="gap-0 px-5">
                <CardDescription className="text-xs">
                    {t(metric.label)}
                </CardDescription>
                <CardTitle className="mt-2 text-2xl tracking-tight">
                    {metric.value}
                </CardTitle>
            </CardHeader>
            <CardContent className="px-5">
                <div
                    className={cn(
                        'flex items-center gap-1 text-xs font-medium',
                        metric.positive
                            ? 'text-foreground'
                            : 'text-muted-foreground',
                    )}
                >
                    {metric.positive ? (
                        <ArrowUpRight className="size-3.5" />
                    ) : (
                        <ArrowDownRight className="size-3.5" />
                    )}
                    <span>{metric.change}</span>
                    <span className="font-normal text-muted-foreground">
                        {t('vsLastMonth')}
                    </span>
                </div>
            </CardContent>
        </Card>
    );
}

function OverviewChart({ t }: { t: Translator }) {
    const [range, setRange] = useState('revenue');

    return (
        <Card className="min-w-0 gap-4 py-5 shadow-none">
            <CardHeader className="flex-row items-start justify-between px-5">
                <div>
                    <CardTitle className="text-base">{t('overview')}</CardTitle>
                    <CardDescription className="mt-1 text-xs">
                        {t('monthlyPerformance')}
                    </CardDescription>
                </div>
                <div className="flex rounded-md border p-0.5">
                    {(['revenue', 'orders', 'profit'] as const).map((item) => (
                        <button
                            key={item}
                            type="button"
                            onClick={() => setRange(item)}
                            className={cn(
                                'rounded px-2 py-1 text-[11px] text-muted-foreground transition-colors',
                                range === item &&
                                    'bg-muted font-medium text-foreground',
                            )}
                        >
                            {t(item)}
                        </button>
                    ))}
                </div>
            </CardHeader>
            <CardContent className="px-5">
                <div className="flex h-56 items-end gap-2 border-b border-l px-2 pt-6 pb-0 sm:gap-4">
                    {chartData.map((height, index) => (
                        <div
                            key={index}
                            className="flex h-full flex-1 items-end"
                        >
                            <div
                                className="w-full rounded-t-sm bg-foreground/80 transition-all hover:bg-foreground"
                                style={{ height: `${height}%` }}
                            />
                        </div>
                    ))}
                </div>
                <div className="mt-2 flex justify-between pl-2 text-[10px] text-muted-foreground">
                    {[
                        'Jan',
                        'Feb',
                        'Mar',
                        'Apr',
                        'May',
                        'Jun',
                        'Jul',
                        'Aug',
                        'Sep',
                        'Oct',
                        'Nov',
                        'Dec',
                    ].map((month) => (
                        <span key={month}>{month}</span>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

function TrafficSources({ t }: { t: Translator }) {
    const sources: {
        label: 'direct' | 'organicSearch' | 'referral' | 'social';
        value: string;
        width: string;
    }[] = [
        { label: 'direct', value: '35%', width: '35%' },
        { label: 'organicSearch', value: '28%', width: '28%' },
        { label: 'referral', value: '22%', width: '22%' },
        { label: 'social', value: '15%', width: '15%' },
    ];

    return (
        <Card className="gap-5 py-5 shadow-none">
            <CardHeader className="px-5">
                <CardTitle className="text-base">
                    {t('trafficSources')}
                </CardTitle>
                <CardDescription className="text-xs">
                    {t('visitorSources')}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 px-5">
                <div className="text-3xl font-semibold tracking-tight">
                    284K{' '}
                    <span className="text-xs font-normal text-muted-foreground">
                        {t('visits')}
                    </span>
                </div>
                <div className="flex h-2 overflow-hidden rounded-full bg-muted">
                    {sources.map((source, index) => (
                        <div
                            key={source.label}
                            className={cn(
                                'h-full',
                                index % 2 === 0
                                    ? 'bg-foreground'
                                    : 'bg-foreground/45',
                            )}
                            style={{ width: source.width }}
                        />
                    ))}
                </div>
                <div className="space-y-3">
                    {sources.map((source, index) => (
                        <div
                            key={source.label}
                            className="flex items-center justify-between text-xs"
                        >
                            <span className="flex items-center gap-2 text-muted-foreground">
                                <span
                                    className={cn(
                                        'size-2 rounded-full',
                                        index % 2 === 0
                                            ? 'bg-foreground'
                                            : 'bg-foreground/45',
                                    )}
                                />
                                {t(source.label)}
                            </span>
                            <span className="font-medium text-foreground">
                                {source.value}
                            </span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

function GoalsCard({ t }: { t: Translator }) {
    return (
        <Card className="gap-5 py-5 shadow-none">
            <CardHeader className="flex-row items-center justify-between px-5">
                <div>
                    <CardTitle className="text-base">
                        {t('monthlyGoals')}
                    </CardTitle>
                    <CardDescription className="mt-1 text-xs">
                        {t('trackProgress')}
                    </CardDescription>
                </div>
                <Button variant="ghost" size="icon" className="size-7">
                    <MoreHorizontal className="size-4" />
                </Button>
            </CardHeader>
            <CardContent className="space-y-5 px-5">
                {[
                    ['revenueTarget', '$38,420 / $50,000', '77%'],
                    ['newCustomers', '184 / 250', '74%'],
                    ['conversionRate', '3.8% / 5.0%', '76%'],
                ].map(([label, value, progress]) => (
                    <div key={label} className="space-y-2">
                        <div className="flex justify-between text-xs">
                            <span>
                                {t(
                                    label as
                                        | 'revenueTarget'
                                        | 'newCustomers'
                                        | 'conversionRate',
                                )}
                            </span>

                            <span className="text-muted-foreground">
                                {progress}
                            </span>
                        </div>
                        <div className="h-1.5 rounded-full bg-muted">
                            <div
                                className="h-full rounded-full bg-foreground"
                                style={{ width: progress }}
                            />
                        </div>
                        <p className="text-[11px] text-muted-foreground">
                            {value}
                        </p>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}

function RecentOrders({ t }: { t: Translator }) {
    return (
        <Card className="min-w-0 gap-4 py-5 shadow-none">
            <CardHeader className="flex-row items-center justify-between px-5">
                <div>
                    <CardTitle className="text-base">
                        {t('recentOrders')}
                    </CardTitle>
                    <CardDescription className="mt-1 text-xs">
                        {t('latestTransactions')}
                    </CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="h-7 text-xs">
                    {t('viewAll')} <ChevronRight className="size-3.5" />
                </Button>
            </CardHeader>
            <CardContent className="overflow-x-auto px-5">
                <table className="w-full min-w-[560px] text-left text-xs">
                    <thead className="border-b text-[10px] tracking-wider text-muted-foreground uppercase">
                        <tr>
                            {(
                                [
                                    'customer',
                                    'orderId',
                                    'product',
                                    'status',
                                    'amount',
                                    '',
                                ] as const
                            ).map((heading) => (
                                <th key={heading} className="pb-3 font-medium">
                                    {heading ? t(heading) : null}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td className="py-3 font-medium">
                                    {order.customer}
                                </td>
                                <td className="py-3 text-muted-foreground">
                                    {order.id}
                                </td>
                                <td className="py-3 text-muted-foreground">
                                    {order.product}
                                </td>
                                <td className="py-3">
                                    <Badge
                                        variant="outline"
                                        className="rounded-md px-1.5 py-0 text-[10px]"
                                    >
                                        {t(
                                            order.status.toLowerCase() as
                                                | 'paid'
                                                | 'pending'
                                                | 'refunded',
                                        )}
                                    </Badge>
                                </td>
                                <td className="py-3 font-medium">
                                    {order.amount}
                                </td>
                                <td className="py-3 text-right">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="size-6"
                                    >
                                        <MoreHorizontal className="size-3.5" />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </CardContent>
        </Card>
    );
}

type Activity = {
    title:
        | 'newOrderReceived'
        | 'paymentCompleted'
        | 'newCustomerJoined'
        | 'reportGenerated';
    description:
        | 'orderPlaced'
        | 'paymentFrom'
        | 'joinedYourTeam'
        | 'salesReportReady';
    detail?: string;
    time: string;
};

const activities: Activity[] = [
    {
        title: 'newOrderReceived',
        description: 'orderPlaced',
        detail: 'Order #ORD-7291',
        time: '2m ago',
    },
    {
        title: 'paymentCompleted',
        description: 'paymentFrom',
        detail: 'Olivia Martin',
        time: '18m ago',
    },
    {
        title: 'newCustomerJoined',
        description: 'joinedYourTeam',
        detail: 'Jackson Lee',
        time: '1h ago',
    },
    {
        title: 'reportGenerated',
        description: 'salesReportReady',
        time: '3h ago',
    },
];

function ActivityCard({ t }: { t: Translator }) {
    return (
        <Card className="gap-5 py-5 shadow-none">
            <CardHeader className="flex-row items-center justify-between px-5">
                <div>
                    <CardTitle className="text-base">
                        {t('recentActivity')}
                    </CardTitle>
                    <CardDescription className="mt-1 text-xs">
                        {t('latestUpdates')}
                    </CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="h-7 text-xs">
                    {t('viewAll')}
                </Button>
            </CardHeader>
            <CardContent className="space-y-5 px-5">
                {activities.map(({ title, description, detail, time }) => (
                    <div key={title} className="flex gap-3">
                        <div className="flex size-7 shrink-0 items-center justify-center rounded-full border bg-muted">
                            <Check className="size-3.5" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-xs font-medium">{t(title)}</p>
                            <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                                {detail
                                    ? `${detail} ${t(description)}`
                                    : t(description)}
                            </p>
                        </div>
                        <span className="text-[10px] text-muted-foreground">
                            {time}
                        </span>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}

export default function Dashboard() {
    const { language } = useCustomizePreferences();
    const t = useTranslations(language);

    return (
        <>
            <Head title={t('dashboard')} />
            <div className="min-h-full bg-background">
                <main className="dashboard-content flex w-full flex-col p-4 md:p-6">
                    <div className="flex items-end justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold tracking-tight">
                                {t('dashboard')}
                            </h1>
                            <p className="mt-1 text-sm text-muted-foreground">
                                {t('welcome')}
                            </p>
                        </div>
                        <Button
                            size="sm"
                            className="hidden gap-1.5 md:inline-flex"
                        >
                            <Plus className="size-4" /> {t('newOrder')}
                        </Button>
                    </div>
                    <div className="dashboard-section grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {metrics.map((metric) => (
                            <MetricCard
                                key={metric.label}
                                metric={metric}
                                t={t}
                            />
                        ))}
                    </div>
                    <div className="dashboard-section grid gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]">
                        <OverviewChart t={t} />
                        <TrafficSources t={t} />
                    </div>
                    <div className="dashboard-section grid gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]">
                        <RecentOrders t={t} />
                        <div className="space-y-4">
                            <GoalsCard t={t} />
                            <ActivityCard t={t} />
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

Dashboard.layout = { breadcrumbs: [{ title: 'Dashboard', href: dashboard() }] };
