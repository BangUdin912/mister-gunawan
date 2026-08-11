import type { Metadata } from "next";

import SettingForm from "./components/SettingForm";

export const metadata: Metadata = {
  title: "Settings | Admin Dashboard",
  description: "Kelola pengaturan website.",
};

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="border-b pb-5">
        <h1 className="text-3xl font-bold tracking-tight">
          Website Settings
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Kelola identitas website, informasi kontak, SEO, media sosial,
          analytics, serta konfigurasi global lainnya.
        </p>
      </div>

      <SettingForm />
    </div>
  );
}