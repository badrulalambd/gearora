
import MyEquipmentRentalCard from "@/components/owner/MyEquipmentRentalCard";
import { Button } from "@/components/ui/button";
import { getEquipmentRental } from "@/lib/api/equipment";
import { auth } from "@/lib/auth";
import { IEquipmentType } from "@/type/type";
import { AlertTriangle, ArrowRight, ServerCrash } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";


const MyEquipmentRentalPage = async () => {

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return (
            <div className="flex min-h-100 flex-col items-center justify-center rounded-2xl border border-border bg-card p-8 text-center">
                <AlertTriangle className="mb-4 h-12 w-12 text-[#F4B400]" />
                <h2 className="text-xl font-bold text-foreground">
                    Authentication Required
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                    Please log in to view your equipment.
                </p>
                <Button className="mt-6 bg-[#F4B400] text-black hover:bg-[#DFA300]">
                    <Link href="/sign-in">Sign In</Link>
                </Button>
            </div>
        );
    }

    const ownerEmail = session.user.email;

    let equipments: IEquipmentType[] = [];

    let serverError = false;

    try {
        equipments = await getEquipmentRental(ownerEmail);
    } catch (error) {
        console.error("Failed to fetch owner equipments:", error);
        serverError = true;
    }

    // Backend server error fallback
    if (serverError) {
        return (
            <div className="flex min-h-100 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-6 py-12 text-center">

                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10">
                    <ServerCrash className="h-8 w-8 text-red-500" />
                </div>

                <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                    Unable to Connect to Server
                </h2>

                <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
                    We&apos;re having trouble connecting to our server right now.
                    Your equipment information is temporarily unavailable.
                    Please try again in a few moments.
                </p>

                <p className="mt-6 text-xs text-muted-foreground">
                    If the problem continues, please contact support.
                </p>
                <Button
                    size="lg"
                    className="mt-5 h-13 rounded-xl bg-[#F4B400] px-7 text-sm font-bold text-[#0B0B0B] shadow-lg shadow-[#F4B400]/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#E5A600] hover:shadow-xl"
                >
                    <Link href="/contact-us">
                        <span className="flex">Contact Us
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </span>
                    </Link>
                </Button>
            </div>
        );
    }

    // Empty state
    if (equipments.length === 0) {
        return (
            <div className="flex min-h-100 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-6 py-12 text-center">

                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F4B400]/15">
                    <AlertTriangle className="h-8 w-8 text-[#B98100] dark:text-[#F4B400]" />
                </div>

                <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                    No Equipment Found
                </h2>

                <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
                    You haven&apos;t listed any equipment yet. Start adding your
                    equipment and make it available for customers to rent.
                </p>

                <Button
                    className="mt-6 rounded-xl bg-[#F4B400] font-semibold text-black hover:bg-[#DFA300]"
                >
                    <Link href="/dashboard/owner/equipments/add-equipment">
                        Add Your First Equipment
                    </Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-5">
            {equipments.map((equipment) => (
                <MyEquipmentRentalCard
                    key={equipment._id}
                    equipment={equipment}
                />
            ))}
        </div>
    );
};

export default MyEquipmentRentalPage;