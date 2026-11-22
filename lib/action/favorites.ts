"use server"
import { IFavoriteType, TCommonApiResponse } from "@/type/type"
import { authFetch } from "../core/server"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

//Add an equipment to the customer's favorites
export const addFavorite = async (payload: {
  customerId?: string
  customerEmail: string
  equipmentId: string
}) => {
  try {
    const res = await fetch(`${BASE_URL}/favorites`, {
      method: "POST",
      cache: "no-store",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    })
    return (await res.json()) as TCommonApiResponse<{ _id: string }>
  } catch (err) {
    console.log("AddFavorite Failed: ", err)
  }
}

//All favorites saved by this customer (newest first)
export const getFavorites = async (email: string): Promise<IFavoriteType[]> => {
  try {
    const api = `${BASE_URL}/favorites/${encodeURIComponent(email)}`
    const res = await authFetch(api)

    // const res = await fetch(
    //   `${BASE_URL}/favorites/${encodeURIComponent(email)}`,
    //   {
    //     method: "GET",
    //     cache: "no-store",
    //   }
    // )

    if (!res.ok) return []
    return (await res.json()) as IFavoriteType[]
  } catch (err) {
    console.log("GetFavorites Failed: ", err)
    return []
  }
}

//Remove one equipment from the customer's favorites
export const deleteFavorite = async (id: string) => {
  try {
    const res = await fetch(`${BASE_URL}/favorites/${id}`, {
      method: "DELETE",
      cache: "no-store",
    })
    return (await res.json()) as TCommonApiResponse<null>
  } catch (err) {
    console.log("DeleteFavorite Failed: ", err)
  }
}
