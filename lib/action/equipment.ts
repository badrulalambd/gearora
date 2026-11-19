import { IEquipmentType } from "@/type/type"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

//call api add-equipment page
export const createEquipment = async (payload: IEquipmentType) => {
  const res = await fetch(`${BASE_URL}/equipments`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  })
  return res.json()
}

//call api to edit and update an equipment
export const updateEquipment = async (
  id: string | undefined,
  payload: Partial<IEquipmentType>
) => {
  const res = await fetch(`${BASE_URL}/update-equipment/${id}`, {
    method: "PATCH",
    cache: "no-store",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  })
  return res.json()
}

//call api to delete an equipment
export const deleteEquipment = async (id: string | undefined) => {
  const res = await fetch(`${BASE_URL}/equipments/${id}`, {
    method: "DELETE",
    cache: "no-store",
  })
  return res.json()
}
