import {Entity} from "./api.config.ts";

export interface DeliverEntity extends Entity{
  name: string;
  phone_number: string;
  email: string;
  avatar: string;
  issued_at: string;
  enabled: boolean;
}
export interface DeliverCharges extends Entity{
  updatedAt: string;
  createdAt: string;
  price: number;
  kilometer: number;
  is_active: boolean;
}
export interface AssessmentEntity extends Entity{
  rating: number;
  content: string;
  deliver: DeliverEntity;
}
