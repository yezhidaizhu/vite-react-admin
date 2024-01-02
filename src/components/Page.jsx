import { useBreadCrumb } from "@/hooks/useApp";
import { navigate } from "@/routers";
import { Breadcrumb } from "antd";
import { useMemo } from "react";

export default function Page({ children, className = "" }) {
  const { breadCrumbs } = useBreadCrumb({ created: true });

  const items = useMemo(() => {
    const len = breadCrumbs?.length;
    return breadCrumbs?.map((d, index) => {
      const disabled = len - 1 == index;
      return {
        title: disabled ? d?.title : <a>{d?.title}</a>,
        onClick: () => {
          !disabled && navigate(d.pathName);
        },
      };
    });
  }, [breadCrumbs]);

  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-2">
        <Breadcrumb items={items} />
      </div>

      <div className={`flex-1 overflow-hidden px-4 py-2 ${className}`}>
        {children}
      </div>
    </div>
  );
}
