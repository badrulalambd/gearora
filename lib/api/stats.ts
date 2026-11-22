import { IAdminStats, ICustomerStats, IOwnerStats } from "@/type/type"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

const fetchStats = async <T>(path: string): Promise<T> => {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "GET",
    cache: "no-store",
  })
  if (!res.ok) {
    throw new Error(`Failed to fetch dashboard stats: ${res.status}`)
  }
  return res.json()
}

//Platform-wide analytics for the admin dashboard
export const getAdminStats = async (): Promise<IAdminStats> =>
  await fetchStats<IAdminStats>("/stats/admin")

//Rental business analytics for one equipment owner
export const getOwnerStats = async (email: string): Promise<IOwnerStats> =>
  await fetchStats<IOwnerStats>(`/stats/owner/${encodeURIComponent(email)}`)

//Saved equipment and rental activity for one customer
export const getCustomerStats = async (
  email: string
): Promise<ICustomerStats> =>
  await fetchStats<ICustomerStats>(
    `/stats/customer/${encodeURIComponent(email)}`
  )
