import { serviceService } from "@/lib/serviceService";
import ServicesSectionClient from "./ServicesSectionClient";


export default async function ServicesSection() {

  const services =
    await serviceService.getFeatured();


  if (!services || services.length === 0) {
    return null;
  }


  return (
    <ServicesSectionClient
      services={services}
    />
  );
}