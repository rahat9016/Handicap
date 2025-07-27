import * as Yup from "yup";
import { InferType } from "yup";
export const organizerTypeSetup = Yup.object().shape({
  name: Yup.string()
      .required("Organizer name is required")
      .min(1, "Organizer name is required"),
});

export type OrganizerTypeSetupForm = InferType<typeof organizerTypeSetup>;