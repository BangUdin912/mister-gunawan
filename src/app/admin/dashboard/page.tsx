import DashboardStats from "@/app/admin/components/DashboardStats";

export default function DashboardPage() {
    return (
        <main className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">
                    Dashboard
                </h1>

                <p className="text-muted-foreground">
                    Selamat datang di halaman dashboard admin.
                </p>
            </div>

            <DashboardStats />
        </main>
    );
}