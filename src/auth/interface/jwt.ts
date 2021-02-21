export interface IJwt {
  id?: number;
  type?: string;
  revoke?: boolean;
  expiredAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}