export default function Page({ children, className = "" }) {
  return (
    <div className="h-full flex flex-col">
      <div className={`flex-1 overflow-hidden m-4 ${className}`}>
        {children}
      </div>
    </div>
  );
}
