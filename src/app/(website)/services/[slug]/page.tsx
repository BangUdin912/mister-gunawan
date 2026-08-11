import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { serviceService } from "@/lib/serviceService";

import HeroServiceDetail from "@/components/services/HeroServiceDetail";
import ServiceDescription from "@/components/services/ServiceDescription";
import ServiceBenefit from "@/components/services/ServiceBenefit";
import ServiceFlow from "@/components/services/ServiceFlow";
import ServiceGallery from "@/components/services/ServiceGallery";
import ServiceSidebar from "@/components/services/ServiceSidebar";


interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const service =
    await serviceService.getBySlug(slug);

  if (!service) {
    return {
      title: "Training Tidak Ditemukan",
    };
  }

  const description =
    service.short_description ||
    service.description ||
    "";

  return {
    title: `${service.title} | Hartawan Sukses Sejahtera`,
    description,

    openGraph: {
      title: service.title,
      description,
      images: service.thumbnail
        ? [
            {
              url: service.thumbnail,
            },
          ]
        : [],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: Props) {
  const { slug } = await params;

  const service =
    await serviceService.getBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <main className="bg-white">
  {/* Hero */}
  <HeroServiceDetail service={service} />

  <section className="py-24">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="grid gap-16 lg:grid-cols-[1fr_360px]">
        {/* Content */}
        <div className="space-y-24">
          <ServiceDescription
            title="Tentang Training"
            description={service.description ?? ""}
          />

          <ServiceBenefit
            benefits={service.benefits ?? []}
          />

          <ServiceFlow
            flow={service.flow ?? []}
          />

          <ServiceGallery
            images={service.gallery ?? []}
          />
        </div>

        {/* Sidebar */}
        <ServiceSidebar
          service={service}
        />
      </div>
    </div>
  </section>

</main>
  );
}