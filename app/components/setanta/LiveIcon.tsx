const LiveIcon = () => {
  return (
    <div className="bg-[#da222c] px-[8px] py-[4px] rounded-[4px] inline-block absolute top-3 right-4 animate-pulse">
      <p className="text-[12px] font-bold text-white flex items-center gap-[4px]">
        <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
          <circle cx="3" cy="3" r="3" fill="white" />
        </svg>
        LIVE
      </p>
    </div>
  );
};

export default LiveIcon;
