export interface User {
  id?: number;
  username: string;
  email: string;
  password?: string;
  Entities?: Entity[];
}

export interface Entity {
  id?: number;
  name: string;
  Users?: User[];
}

export interface UserEntity {
  id?: number;
  userId: number;
  entityId: number;
}
