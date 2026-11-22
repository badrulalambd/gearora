"use server"

import { ICategoryCount, IEquipmentType } from "@/type/type"
import { authFetch } from "../core/server"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

//Get equipments for owner my-equipment page
//......................................................................................................
export const getEquipments = async (ownerEmail: string | undefined) => {
  const api = `${BASE_URL}/equipments/${ownerEmail}`
  const res = await authFetch(api);

  // const res = await fetch(`${BASE_URL}/equipments/${ownerEmail}`, {
  //   method: "GET",
  //   cache: "no-store",
  // })

  if (!res.ok) {
    throw new Error(`Failed to fetch equipments: ${res.status}`)
  }
  return res.json()
}

//Get equipments for owner my-equipment-rental page with the approved equipment
export const getEquipmentRental = async (ownerEmail: string | undefined) => {
  const api = `${BASE_URL}/equipment-rental/${ownerEmail}`
  const res = await authFetch(api);
  
  // const res = await fetch(`${BASE_URL}/equipment-rental/${ownerEmail}`, {
  //   method: "GET",
  //   cache: "no-store",
  // })
  
  if (!res.ok) {
    throw new Error(`Failed to fetch equipments: ${res.status}`)
  }
  return res.json()
}

//Get approved equipments for the public all-equipment page.
//Search, filtering and sorting all happen on the backend — `query` is the
//URLSearchParams built from the page's searchParams.
export const getAllEquipments = async (
  query: URLSearchParams = new URLSearchParams()
): Promise<IEquipmentType[]> => {
  const queryString = query.toString()
  const res = await fetch(
    `${BASE_URL}/equipments${queryString ? `?${queryString}` : ""}`,
    {
      method: "GET",
      cache: "no-store",
    }
  )
  if (!res.ok) {
    throw new Error(`Failed to fetch equipments: ${res.status}`)
  }
  return res.json()
}

//Get distinct categories of approved equipment for the public page's filter
export const getEquipmentCategories = async (): Promise<string[]> => {
  const res = await fetch(`${BASE_URL}/equipments/categories`, {
    method: "GET",
    cache: "no-store",
  })
  if (!res.ok) {
    throw new Error(`Failed to fetch equipment categories: ${res.status}`)
  }
  return res.json()
}

//Get popular categories of approved equipment for the home page categories section
export const getPopularEquipmentCategories = async (): Promise<ICategoryCount[]> => {
  const res = await fetch(`${BASE_URL}/equipments/popular-categories`, {
    method: "GET",
    cache: "no-store",
  })
  if (!res.ok) {
    throw new Error(`Failed to fetch equipment categories: ${res.status}`)
  }
  return res.json()
}

//Get a single equipment for the detail page. Returns null when it doesn't exist.
//..........................................................................................
export const getEquipmentById = async (
  id: string
): Promise<IEquipmentType | null> => {
  const api = `${BASE_URL}/equipment/${id}`

  const res = await authFetch(api);

  // const res = await fetch(`${BASE_URL}/equipment/${id}`, {
  //   method: "GET",
  //   cache: "no-store",
  // })


  if (res.status === 400 || res.status === 404) {
    return null
  }
  if (!res.ok) {
    throw new Error(`Failed to fetch equipment: ${res.status}`)
  }
  return res.json()
}

//Get every equipment listing (any status) for the admin All Equipment page
export const getAdminEquipments = async (): Promise<IEquipmentType[]> => {
  const api = `${BASE_URL}/equipments/all`
  const res = await authFetch(api)

  // const res = await fetch(`${BASE_URL}/equipments/all`, {
  //   method: "GET",
  //   cache: "no-store",
  // })

  if (!res.ok) {
    throw new Error(`Failed to fetch equipments: ${res.status}`)
  }
  return res.json()
}

//Get 6 equipment for featured equipment section on the home page
export const getFeaturedEquipment = async () => {
  const res = await fetch(`${BASE_URL}/featured-equipments`, {
    method: "GET",
    cache: "no-store",
  })
  if (!res.ok) {
    throw new Error(`Failed to fetch equipments: ${res.status}`)
  }
  return res.json()
}
