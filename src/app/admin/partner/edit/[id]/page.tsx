import { notFound } from "next/navigation";

import PartnerForm from "../../components/PartnerForm";

import {
    partnerService,
} from "@/lib/partnerService";


interface EditPartnerPageProps {

    params: Promise<{
        id: string;
    }>;

}


export default async function EditPartnerPage({
    params,
}: EditPartnerPageProps) {

    const {
        id,
    } = await params;


    const partner =
        await partnerService.getById(id);


    if (!partner) {

        notFound();

    }


    return (

        <div
            className="
                w-full
                px-4
                py-6
                sm:px-6
                lg:px-8
            "
        >

            <PartnerForm
                partner={partner}
            />

        </div>

    );

}