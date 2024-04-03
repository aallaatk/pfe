export const contactInfo = {
    phone: 21375123,
    email: "sleimiala@gmail.com",
    address: "rue ezz edine hanachi"
  };
  export  interface TourInfo {
    [key: string]: string | number | Date | null | File;
    tourname: string;
    creator: string;
    date: Date ; // Allow both Date and string types for date
    price: number;
    description: string;
    attendees: number;
    image: File | null; // Assume File type for image upload
    location: string;
    duration: string;
  }
  