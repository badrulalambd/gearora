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

//admin All Users page: change a user's role through the backend API
export const updateUserRole = async (
  id: string,
  role: "customer" | "owner" | "admin"
) => {
  const res = await fetch(`${BASE_URL}/users/${id}/role`, {
    method: "PATCH",
    cache: "no-store",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ role }),
  })

  const data = await res.json().catch(() => null)

  if (!res.ok || !data) {
    throw new Error(data?.message ?? "Failed to update role.")
  }

  return data
}

//admin All Users page: delete a customer or owner after confirmation
export const deleteUserAccount = async (id: string) => {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: "DELETE",
    cache: "no-store",
  })

  const data = await res.json().catch(() => null)

  if (!res.ok || !data) {
    throw new Error(data?.message ?? "Failed to delete user.")
  }

  return data
}
