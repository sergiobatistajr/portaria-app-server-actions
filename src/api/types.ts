export interface Guest {
  id: string;
  plate: string | null;
  name: string;
  isInside: boolean;
  apartment: number | null;
  observations: string | null;
  model: string | null;
  pax: number | null;
  entryDate: Date;
  entryHour: string;
  exitDate: Date | null;
  exitHour: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export type Role = "admin" | "relatorio" | "porteiro";

export interface User {
  id: string;
  name: string;
  username: string;
  hashedPassword: string;
  isActive: boolean;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}
