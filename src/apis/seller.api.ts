import { LocationEntity } from "./location.api";

export interface SellerEntity {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  phone_number: string;
  email: string;
  background_image: string;
  avatar: string;
  open_at: string;
  close_at: string;
  issued_at:string;
  enabled: boolean;
  location: LocationEntity;
}
