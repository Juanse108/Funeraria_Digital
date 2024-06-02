import { RolePermission } from "./role-permission.model";

export class Role {
    _id?: string;
    name: string;
    description: string; 
    role_permissions?: RolePermission []
}
