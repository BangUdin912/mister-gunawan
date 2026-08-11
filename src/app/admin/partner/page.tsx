"use client";

import {
    useEffect,
    useMemo,
    useState,
} from "react";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import {
    Plus,
    Loader2,
    Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import PartnerCard from "./components/PartnerCard";
import PartnerDeleteDialog from "./components/PartnerDeleteDialog";
import PartnerFilters from "./components/PartnerFilters";

import {
    partnerService,
} from "@/lib/partnerService";

import type {
    Partner,
} from "@/types/partner";


type PartnerStatusFilter =
    | "all"
    | "active"
    | "inactive";


export default function PartnerAdminPage() {

    const router = useRouter();


    const [
        partners,
        setPartners,
    ] = useState<Partner[]>([]);


    const [
        loading,
        setLoading,
    ] = useState(true);


    const [
        deletePartner,
        setDeletePartner,
    ] = useState<Partner | null>(null);


    const [
        deleteLoading,
        setDeleteLoading,
    ] = useState(false);


    const [
        search,
        setSearch,
    ] = useState("");


    const [
        status,
        setStatus,
    ] = useState<PartnerStatusFilter>("all");


    /**
     * Load partner
     */
    async function loadPartners() {

        try {

            setLoading(true);

            const data =
                await partnerService.getAll();

            setPartners(data ?? []);

        } catch (error) {

            console.error(
                "Load partners error:",
                error
            );

            toast.error(
                "Gagal mengambil data partner"
            );

        } finally {

            setLoading(false);

        }

    }


    /**
     * Initial load
     */
    useEffect(() => {

        loadPartners();

    }, []);


    /**
     * Filter partner
     */
    const filteredPartners =
        useMemo(() => {

            return partners.filter(
                (partner) => {

                    const keyword =
                        search
                            .trim()
                            .toLowerCase();


                    const matchSearch =
                        partner.name
                            .toLowerCase()
                            .includes(keyword);


                    const matchStatus =
                        status === "all"
                            ? true
                            : status === "active"
                                ? partner.is_active
                                : !partner.is_active;


                    return (
                        matchSearch &&
                        matchStatus
                    );

                }
            );

        }, [
            partners,
            search,
            status,
        ]);


    /**
     * Create
     */
    function handleCreate() {

        router.push(
            "/admin/partner/create"
        );

    }


    /**
     * Edit
     */
    function handleEdit(
        partner: Partner
    ) {

        router.push(
            `/admin/partner/edit/${partner.id}`
        );

    }


    /**
     * Delete
     */
    async function handleDelete() {

        if (!deletePartner) {
            return;
        }


        try {

            setDeleteLoading(true);


            await partnerService.delete(
                deletePartner.id
            );


            toast.success(
                "Partner berhasil dihapus"
            );


            setDeletePartner(null);


            await loadPartners();

        } catch (error) {

            console.error(
                "Delete partner error:",
                error
            );


            toast.error(
                "Gagal menghapus partner"
            );

        } finally {

            setDeleteLoading(false);

        }

    }


    return (

        <div className="space-y-6 p-6">

            {/* HEADER */}

            <div
                className="
                    flex
                    flex-col
                    gap-4
                    md:flex-row
                    md:items-center
                    md:justify-between
                "
            >

                <div>

                    <h1
                        className="
                            text-2xl
                            font-bold
                            tracking-tight
                        "
                    >
                        Partner & Klien
                    </h1>


                    <p
                        className="
                            text-sm
                            text-muted-foreground
                        "
                    >
                        Kelola logo partner bisnis
                        dan klien HSS.
                    </p>

                </div>


                <Button
                    onClick={handleCreate}
                >

                    <Plus
                        className="
                            mr-2
                            h-4
                            w-4
                        "
                    />

                    Tambah Partner

                </Button>

            </div>


            {/* FILTER */}

            <PartnerFilters
                search={search}
                status={status}
                onSearchChange={setSearch}
                onStatusChange={setStatus}
                onReset={() => {

                    setSearch("");
                    setStatus("all");

                }}
            />


            {/* CONTENT */}

            {loading ? (

                <div
                    className="
                        flex
                        h-60
                        items-center
                        justify-center
                    "
                >

                    <Loader2
                        className="
                            h-8
                            w-8
                            animate-spin
                            text-muted-foreground
                        "
                    />

                </div>

            ) : filteredPartners.length === 0 ? (

                <div
                    className="
                        flex
                        h-60
                        flex-col
                        items-center
                        justify-center
                        gap-3
                        rounded-lg
                        border
                        border-dashed
                    "
                >

                    <Users
                        className="
                            h-10
                            w-10
                            text-muted-foreground
                        "
                    />


                    <p
                        className="
                            text-sm
                            text-muted-foreground
                        "
                    >
                        Belum ada data partner.
                    </p>


                    <Button
                        variant="outline"
                        onClick={handleCreate}
                    >
                        Tambah Partner
                    </Button>

                </div>

            ) : (

                <div
                    className="
                        grid
                        gap-6
                        sm:grid-cols-2
                        lg:grid-cols-3
                        xl:grid-cols-4
                    "
                >

                    {filteredPartners.map(
                        (partner) => (

                            <PartnerCard
                                key={partner.id}
                                partner={partner}
                                onEdit={handleEdit}
                                onDelete={
                                    setDeletePartner
                                }
                            />

                        )
                    )}

                </div>

            )}


            {/* DELETE DIALOG */}

            <PartnerDeleteDialog
                open={
                    Boolean(deletePartner)
                }
                partner={deletePartner}
                loading={deleteLoading}
                onOpenChange={(open) => {

                    if (!open) {

                        setDeletePartner(
                            null
                        );

                    }

                }}
                onConfirm={handleDelete}
            />

        </div>

    );

}