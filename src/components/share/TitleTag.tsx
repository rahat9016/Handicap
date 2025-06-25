export default function TitleTag({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3">
      
      <h3 className="text-[#8C8CCB] font-medium font-inter text-sm">
        {title}
      </h3>
      <span className="block w-[82px] h-[1px] bg-[#8C8CCB]"></span>
    </div>
  );
}