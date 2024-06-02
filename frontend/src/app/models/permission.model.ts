import { RolePermission } from "./role-permission.model";

export class Permission {
    _id?: string;
    url: string;
    method: string;
    role_permissions?: RolePermission []
}
