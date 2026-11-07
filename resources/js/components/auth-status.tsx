export default function AuthStatus({ message }: { message: string }) {
    return (
        <div className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-center text-sm font-medium text-emerald-600 dark:text-emerald-400">
            {message}
        </div>
    );
}
