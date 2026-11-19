
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000'

export const getEquipments = async (ownerEmail : string | undefined) => {
    const res = await fetch(`${BASE_URL}/equipments/${ownerEmail}`, {
        method: "GET",
        cache: "no-store"
    })
    if (!res.ok) {
        throw new Error(`Failed to fetch equipments: ${res.status}`);
    }
    return res.json();
}