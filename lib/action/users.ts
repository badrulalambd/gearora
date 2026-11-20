const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

//call api to update a user's profile details (customer/owner/admin profile page)
export const updateUserDetail = async (
  id: string,
  payload: {
    name?: string
    image?: string
    phone?: string
    address?: string
  }
) => {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: "PATCH",
    cache: "no-store",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  const data = await res.json().catch(() => null)

  if (!res.ok || !data) {
    throw new Error(data?.message ?? "Failed to update profile.")
  }

  return data
}
