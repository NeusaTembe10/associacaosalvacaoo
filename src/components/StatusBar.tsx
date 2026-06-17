export default function StatusBar() {
  return (
    <div className="flex items-center justify-between px-6 pt-3 pb-1 text-white text-xs font-medium">
      <span>9:41</span>
      <div className="flex items-center gap-1">
        <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
          <rect x="0" y="6" width="2.5" height="5" rx="0.5" fill="white" />
          <rect x="4.5" y="4" width="2.5" height="7" rx="0.5" fill="white" />
          <rect x="9" y="2" width="2.5" height="9" rx="0.5" fill="white" />
          <rect x="13.5" y="0" width="2.5" height="11" rx="0.5" fill="white" />
        </svg>
        <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
          <path d="M7.5 9.5L0.5 4.2C3 1.6 5.1 0.5 7.5 0.5C9.9 0.5 12 1.6 14.5 4.2L7.5 9.5Z" fill="white" />
        </svg>
        <svg width="22" height="11" viewBox="0 0 22 11" fill="none">
          <rect x="0.5" y="0.5" width="18" height="10" rx="2" stroke="white" />
          <rect x="2" y="2" width="15" height="7" rx="1" fill="white" />
          <rect x="19.5" y="3.5" width="1.5" height="4" rx="0.5" fill="white" />
        </svg>
      </div>
    </div>
  );
}
