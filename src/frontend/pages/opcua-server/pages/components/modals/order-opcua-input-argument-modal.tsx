import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { OpcuaServerInputArgumentDto } from "../../../../../../backend/models/opcua-server/dtos/opcua-server-input-argument.dto";
import { useState } from "react";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

type Props = {
  data: OpcuaServerInputArgumentDto[];
  onClose: () => void;
  onUpdate: (dtos: OpcuaServerInputArgumentDto) => void;
};

export function OrderOpcuaInputArgumentModal({
  data,
  onClose,
  onUpdate,
}: Props) {
  const [items, setItems] = useState<OpcuaServerInputArgumentDto[]>(data);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function SortableItem({ item }: { item: OpcuaServerInputArgumentDto }) {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: item.id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      cursor: isDragging ? "grabbing" : "grab",
      zIndex: isDragging ? 1050 : "auto", // Sorgt dafür, dass das gezogene Item oben schwebt
    };

    return (
      <ul
        ref={setNodeRef}
        className={`list-group-item d-flex shadow-sm ${isDragging ? "border-primary" : ""}`}
        style={style}
        {...attributes}
        {...listeners}
      >
        <span className="flex-fill">{item.name}</span>
        <span>{item.order}</span>
      </ul>
    );
  }

  function updateInputArgument() {
    items.forEach((v) => {
      window.api.updateOpcuaServerInputArgument(v.id, v).then((result) => {
        onUpdate(result);
      });
    });

    onClose();
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((prevItems) => {
        const oldIndex = prevItems.findIndex((item) => item.id === active.id);
        const newInedx = prevItems.findIndex((item) => item.id === over.id);

        const moveArray = arrayMove(prevItems, oldIndex, newInedx);

        const updateArray = moveArray.map((item, index) => ({
          ...item,
          order: index + 1,
        }));

        console.log(updateArray);

        return updateArray;
      });
    }
  }

  return (
    <>
      <div className="modal-backdrop fade show d-block"></div>

      <div className="modal fade show d-block">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <span className="modal-title">Reorder Input Arguments</span>
              <button className="btn-close" onClick={() => onClose()}></button>
            </div>
            <div className="modal-body">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <div className="list-group">
                  <SortableContext
                    items={items}
                    strategy={verticalListSortingStrategy}
                  >
                    {items
                      .sort((a, b) => {
                        return a.order - b.order;
                      })
                      .map((v) => (
                        <SortableItem item={v}></SortableItem>
                      ))}
                  </SortableContext>
                </div>
              </DndContext>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-success"
                onClick={() => updateInputArgument()}
              >
                Save
              </button>
              <button className="btn btn-danger" onClick={() => onClose()}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
