import * as Yup from "yup";
import { InferType } from "yup";


export const OrganizerUserRoleSchema = Yup.object().shape({
  userId: Yup.string()
    .required("User ID is required")
    .min(1, "User ID is required"),
  organizationId: Yup.string()
    .required("Organization ID is required")
    .min(1, "Organization ID is required"),
  roleId: Yup.string()
    .required("Role ID is required")
    .min(1, "Role ID is required"),
});

export type OrganizerUserRoleForm = InferType<typeof OrganizerUserRoleSchema>;
