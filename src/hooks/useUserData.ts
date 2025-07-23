import { useQuery } from "@tanstack/react-query";
import { getUserAdmin, } from "../api/api";

// export const useUserData = () => {
//     return useQuery({
//         queryKey: ["allUserData"],
//         queryFn: () => ,
//     });
// };

export const useUserAdminData = () => {
    return useQuery({
        queryKey: ["allUserAdminData"],
        queryFn: () => getUserAdmin(),
    });
};