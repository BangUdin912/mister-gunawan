import PortfolioEdit from "../../components/PortfolioEdit";

interface EditPortfolioPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditPortfolioPage({
  params,
}: EditPortfolioPageProps) {
  const { id } = await params;

  return <PortfolioEdit id={id} />;
}