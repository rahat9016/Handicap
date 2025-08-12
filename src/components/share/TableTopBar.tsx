// import { Plus, UsersIcon } from 'lucide-react';
// import { Button } from '../ui/button';

// interface TableTopBarProps {
//   isCreate?: boolean;  
//   setIsModalOpen?: (isOpen: boolean) => void;
// }

// export default function TableTopBar({ isCreate, setIsModalOpen }: TableTopBarProps) {
//   return (
//     <div className="flex w-full items-center justify-between mb-6">
//         <div className="flex items-center gap-2">
//           <div className="w-12 h-12 bg-dashboard-primary rounded-lg flex items-center justify-center text-white">
//             <UsersIcon />
//           </div>
//           <div>
//             <h1 className="text-2xl font-bold text-erieBlack font-inter">
//             Users
//           </h1>
//           <p className="font-inter text-xs">Manage user accounts</p>
//           </div>
//         </div>
//         <div>
//           {/* <Input
//             placeholder="Search users..."
//             value={search}
//             onChange={handleSearchChange}
//             className="w-[300px]"
//           /> */}
//         </div>
//         { isCreate && <Button
//           className="text-white font-inter text-sm font-medium bg-rose-600 hover:bg-rose-700 h-11 gap-1"
//           onClick={() => setIsModalOpen(true)}
//         >
//           <Plus className="!text-2xl text-white" /> Create
//         </Button>}
//       </div>
//   )
// }
