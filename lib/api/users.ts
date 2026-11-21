import { IUserType } from "@/type/type"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

//Get every registered user for the admin All Users page
export const getUsers = async (): Promise<IUserType[]> => {
  const res = await fetch(`${BASE_URL}/users`, {
    method: "GET",
    cache: "no-store",
  })
  if (!res.ok) {
    throw new Error(`Failed to fetch users: ${res.status}`)
  }
  return res.json()
}
