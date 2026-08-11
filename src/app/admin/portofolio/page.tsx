import PortfolioTable from "./components/PortfolioTable";

export default function PortfolioPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Portofolio
        </h1>

        <p className="text-muted-foreground">
          Kelola data portofolio pelatihan, seminar, workshop, dan dokumentasi kegiatan.
        </p>
      </div>

      <PortfolioTable />
    </div>
  );
}