import * as Yup from "yup";
import { InferType } from "yup";
export const roleChange = Yup.object().shape({
  roleId: Yup.string()
      .required("Role is required")
      .min(1, "Role is required"),
});

export type RoleChangeForm = InferType<typeof roleChange>;