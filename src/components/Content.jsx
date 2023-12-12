export default function Content({ children, className = "" }) {
  return (
    <div className="h-full flex flex-col">
      <div className={`flex-1 m-4 ${className}`}>{children}</div>
    </div>
  );
}
