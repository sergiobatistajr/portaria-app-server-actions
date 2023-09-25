export interface Guest {
  id: string;
  plate?: string;
  name: string;
  isInside: boolean;
  apartment?: number;
  observations?: string;
  model?: string;
  pax?: number;
  entryDate: Date;
  entryHour: string;
  exitDate?: Date;
  exitHour?: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

type Role = "ADMIN" | "RELATORIO" | "PORTEIRO";

export interface User {
  id: string;
  name: string;
  hashedPassword: string;
  isActive: boolean;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}
