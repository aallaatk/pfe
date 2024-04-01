export const contactInfo = {
    phone: 21375123,
    email: "sleimiala@gmail.com",
    address: "rue ezz edine hanachi"
  };
  export  interface TourInfo {
    tourname: string;
    creator: string;
    date: string;
    price: number;
    description: string;
    attendees: number;
    image: File | null; 
    location:string;
    duration:string
  }