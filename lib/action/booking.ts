import {
  IAdminBookingType,
  IBookingType,
  TCommonApiResponse,
} from "@/type/type"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

//Call api for booking page — creates a pending booking and a Stripe Checkout session
export const createBooking = async (payload: {
  equipmentId: string | undefined
  customerEmail: string
  customerId?: string
  startDate: string
  endDate: string
  quantity: number
  contactNumber: string
  deliveryAddress: string
  notes: string
}) => {
  try {
    const res = await fetch(`${BASE_URL}/create-checkout-session`, {
      method: "POST",
      cache: "no-store",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    })
    const data = await res.json()
    return data
  } catch (err) {
    console.log("CreateBooking Failed: ", err)
  }
}

//Confirm a paid Stripe session: booking pending→confirmed + saves the payment
export const confirmBooking = async (sessionId: string) => {
  try {
    const res = await fetch(`${BASE_URL}/bookings/confirm`, {
      method: "POST",
      cache: "no-store",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ sessionId }),
    })
    return (await res.json()) as TCommonApiResponse<{ booking: IBookingType }>
  } catch (err) {
    console.log("ConfirmBooking Failed: ", err)
  }
}

//Confirmed rentals of one customer — for the My Rentals page
export const getMyRentals = async (email: string): Promise<IBookingType[]> => {
  try {
    const res = await fetch(
      `${BASE_URL}/bookings/customer/${encodeURIComponent(email)}`,
      {
        method: "GET",
        cache: "no-store",
      }
    )
    if (!res.ok) return []
    return (await res.json()) as IBookingType[]
  } catch (err) {
    console.log("GetMyRentals Failed: ", err)
    return []
  }
}

//All rental bookings for the admin All Rentals page. The backend applies the
//equipment status filter: "" = All, otherwise Pending / Approved / Rejected.
export const getAllBookings = async (
  status: string = ""
): Promise<IAdminBookingType[]> => {
  const query = new URLSearchParams()
  if (status) query.set("status", status)
  const queryString = query.toString()

  const res = await fetch(
    `${BASE_URL}/bookings${queryString ? `?${queryString}` : ""}`,
    {
      method: "GET",
      cache: "no-store",
    }
  )
  if (!res.ok) {
    throw new Error(`Failed to fetch rentals: ${res.status}`)
  }
  return (await res.json()) as IAdminBookingType[]
}
