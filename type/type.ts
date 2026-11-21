export interface IEquipmentType {
    _id?: string;
    name: string;
    description: string;
    category: string;
    brand: string;
    model: string;
    location: string;
    rentalPrice: number;
    rentalType: "hourly" | "daily" | "weekly" | "monthly";
    quantity: number;
    condition: "new" | "like-new" | "good" | "fair";
    image: string;
    rentalTerms: string;
    status: "Pending" | "Approved" | "Rejected";
    ownerName: string;
    ownerEmail: string;
    ownerId: string;
}

export interface IEquipments {
    equipments: IEquipmentType[];
}

export type TCommonApiResponse<T> = {
    success: boolean,
    message: string,
    data: T,
}

export interface IFavoriteType {
    _id: string;
    customerId?: string;
    customerEmail: string;
    equipmentId: string;
    equipmentName: string;
    equipmentImage: string;
    category: string;
    rentalPrice: number;
    rentalType: string;
    location: string;
    addedAt: string;
}

export interface IBookingType {
    _id: string;
    equipmentId: string;
    equipmentName?: string;
    equipmentImage?: string;
    category?: string;
    customerEmail: string;
    startDate: string;
    endDate: string;
    quantity: number;
    contactNumber?: string;
    deliveryAddress?: string;
    notes?: string;
    rentalType?: string;
    rentalPrice?: number;
    durationUnits?: number;
    totalAmount: number;
    status: "pending" | "confirmed" | string;
    paymentStatus?: string;
    transactionId?: string;
    amountPaid?: number;
    currency?: string;
    createdAt: string;
}

export type TUserRole = "customer" | "owner" | "admin";

export interface IUserType {
    _id: string;
    name: string;
    email: string;
    image?: string;
    role: TUserRole;
    createdAt: string;
    phone?: string;
    address?: string;
}

//Booking row for the admin All Rentals page, enriched on the backend with
//customer, owner and equipment status details.
export interface IAdminBookingType extends IBookingType {
    customerName?: string;
    customerImage?: string;
    ownerName?: string;
    ownerEmail?: string;
    equipmentStatus?: string;
}

export interface ICategoryCount {
  category: string;
  totalEquipment: number;
}