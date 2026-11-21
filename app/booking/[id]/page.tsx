import { getEquipmentById } from "@/lib/api/equipment";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import BookingForm from "@/components/booking/BookingForm";
import { CreditCard, LockKeyhole, ShieldCheck } from "lucide-react";

interface BookingPageProps {
    params: Promise<{ id: string }>;
}

const BookingPage = async ({ params }: BookingPageProps) => {
    const { id } = await params;

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const user = session?.user;

    const equipment = await getEquipmentById(id);
    console.log("Equipment on Bookings page: ", equipment);

    if (!equipment) {
        return <div>Equipment not found.</div>;
    }

    return (
        <div className="p-5 mx-auto w-full max-w-2xl">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">

                {/* Header */}
                <div className="border-b border-border bg-muted/30 px-6 py-5 sm:px-8">
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">
                        Complete Your Booking
                    </h1>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        Reserve your equipment and get ready to put it to work.
                    </p>
                </div>

                {/* Booking Content */}
                <div className="space-y-6 p-6 sm:p-8">

                    {/* Payment Info */}
                    <div className="flex items-start gap-3 rounded-xl border border-[#F4B400]/30 bg-[#F4B400]/10 p-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F4B400]/20">
                            <CreditCard className="h-5 w-5 text-[#B98100] dark:text-[#F4B400]" />
                        </div>

                        <div>
                            <h3 className="font-semibold text-foreground">
                                Secure Booking
                            </h3>
                            <p className="mt-1 text-sm leading-5 text-muted-foreground">
                                Confirm your equipment booking and pay securely
                                by card through Stripe.
                            </p>
                        </div>
                    </div>

                    {/* Authenticated User */}
                    {user ? (
                        <div className="space-y-4">
                            <BookingForm
                                equipment={equipment}
                                customerEmail={user.email}
                                customerId={user.id}
                            />

                            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                                <ShieldCheck className="h-4 w-4 text-green-600" />
                                Booking securely with Gearora
                            </div>
                        </div>
                    ) : (
                        /* Guest User */
                        <div className="space-y-4">
                            <Link
                                href="/sign-in"
                                className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-[#F4B400] text-base font-bold text-[#0B0B0B] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#DFA300] hover:shadow-md"
                            >
                                Sign in to continue
                            </Link>

                            <p className="text-center text-sm text-muted-foreground">
                                Sign in to your account to reserve this equipment.
                            </p>
                        </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-center gap-2 border-t border-border pt-4 text-xs text-muted-foreground">
                        <LockKeyhole className="h-3.5 w-3.5" />
                        <span>Your booking information is handled securely.</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;