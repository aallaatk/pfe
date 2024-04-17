export const contactInfo = {
    phone: 21375123,
    email: "sleimiala@gmail.com",
    address: "rue ezz edine hanachi"
  };
  export interface TourInfo {
    tourname: string;
    creator: string;
    date: Date | string; // Allow both Date and string types for date
    price: number;
    description?: string; // Optional description
    attendees?: number; // Optional attendees
    location?: string; // Optional location
    duration?: string; // Optional duration
    imageUrl?: File | null; // Optional image (nullable)
  }
  
  