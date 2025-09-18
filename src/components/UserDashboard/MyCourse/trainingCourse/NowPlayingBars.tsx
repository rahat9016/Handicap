function NowPlayingBars() {
  return (
    <div className="flex gap-[3px] items-end">
      <span className="w-[3px] h-2 bg-green-400 animate-bounce"></span>
      <span className="w-[3px] h-4 bg-green-400 animate-bounce delay-150"></span>
      <span className="w-[3px] h-3 bg-green-400 animate-bounce delay-300"></span>
    </div>
  );
}

export default NowPlayingBars;