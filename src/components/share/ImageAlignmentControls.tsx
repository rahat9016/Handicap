
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export function ImageAlignmentControls({ editor }: any) {
//   const alignments = [
//     { value: 'left', icon: '⬅️', label: 'Align Left' },
//     { value: 'center', icon: '🔘', label: 'Align Center' },
//     { value: 'right', icon: '➡️', label: 'Align Right' },
//     { value: 'inline', icon: '📝', label: 'Inline with Text' },
//   ];

//   const handleAlignment = (align: string) => {
//     if (align === 'inline') {
//       editor.chain().focus().setParagraph().run();
//     } else {
//       editor.chain().focus().setTextAlign(align).run();
//     }
//   };

//   return (
//     <div className="flex items-center gap-1 border-l pl-2 ml-2">
//       {alignments.map((alignment) => (
//         <button
//           key={alignment.value}
//           type="button"
//           onClick={() => handleAlignment(alignment.value)}
//           className={cn(
//             "w-10 h-10 rounded-sm text-sm hover:bg-slate-100",
//             editor.isActive({ textAlign: alignment.value }) && 
//             "bg-blue-100 text-blue-600"
//           )}
//           title={alignment.label}
//         >
//           {alignment.icon}
//         </button>
//       ))}
//     </div>
//   );
// }