import { MenuOutlined } from "@ant-design/icons";
import { DndContext } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";

export default function SortRow({ children, ...props }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props["data-row-key"],
  });
  const style = {
    ...props.style,
    transform: CSS.Transform.toString(
      transform && {
        ...transform,
        scaleY: 1,
      }
    ),
    transition,
    ...(isDragging
      ? {
          position: "relative",
          zIndex: 9999,
        }
      : {}),
  };

  return (
    <tr {...props} ref={setNodeRef} style={style} {...attributes}>
      {React.Children.map(children, (child) => {
        if (child.key === "sort") {
          return React.cloneElement(child, {
            children: (
              <div
                className="flex justify-center"
                ref={setActivatorNodeRef}
                style={{
                  touchAction: "none",
                  cursor: "move",
                }}
                {...listeners}
              >
                <MenuOutlined />
              </div>
            ),
          });
        }
        return child;
      })}
    </tr>
  );
}

export function TableDndCtx({ dataSource = [], children, onDragEnd }) {
  const _onDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      const activeIndex = dataSource?.findIndex((i) => i.key === active.id);
      const overIndex = dataSource?.findIndex((i) => i.key === over?.id);
      onDragEnd?.({ activeIndex, overIndex });
    }
  };

  return (
    <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={_onDragEnd}>
      <SortableContext
        items={dataSource?.map((i) => i.key)}
        strategy={verticalListSortingStrategy}
      >
        {children}
      </SortableContext>
    </DndContext>
  );
}
