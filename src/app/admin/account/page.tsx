import AccountHeader from "./components/AccountHeader";
import AvatarUpload from "./components/AvatarUpload";
import ProfileCard from "./components/ProfileCard";
import PasswordCard from "./components/PasswordCard";
import LogoutCard from "./components/LogoutCard";

export default function AccountPage() {
    return (
        <main className="min-h-screen bg-stone-50">

            <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">

                {/* Page Header */}
                <div className="mb-8">
                    <p className="text-sm font-semibold uppercase tracking-wider text-amber-600">
                        Administrator
                    </p>

                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-stone-800 sm:text-4xl">
                        Account
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-500 sm:text-base">
                        Kelola informasi akun administrator,
                        foto profil, password, dan sesi login.
                    </p>
                </div>

                {/* Account Header */}
                <div className="space-y-6">

                    <AccountHeader />

                    {/* Avatar */}
                    <AvatarUpload />

                    {/* Profile */}
                    <ProfileCard />

                    {/* Password */}
                    <PasswordCard />

                    {/* Logout */}
                    <LogoutCard />

                </div>

            </div>

        </main>
    );
}