
// export interface IEquipmentType {
//   name: string;
//   description: string;
//   category: string;
//   brand: string;
//   model: string;
//   location: string;
//   rentalPrice: number;
//   rentalType: string;
//   quantity: number;
//   condition: string;
//   image: string;
//   rentalTerms: string;
//   status: string;
//   ownerName: string;
//   ownerEmail: string;
//   ownerId: string;
// }


export interface IEquipmentType {
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