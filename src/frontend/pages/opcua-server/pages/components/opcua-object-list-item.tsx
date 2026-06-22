import { useRef, useState } from "react";
import { OpcuaMethodListItem } from "./opcua-method-list-item";
import { NewOpcuaMethodModal } from "./modals/new-opcua-method-modal";
import { useOpcuaServerBound } from "../../services/opcua-server.service";
import { useTooltip } from "../../../../helper/tooltip-helper";
import { EditOpcuaObjectModal } from "./modals/edit-opcua-object-modal";

type Props = {
  id: string;
};

export function OpcuaObjectListItem({ id }: Props) {
  const [showNewModal, setNewModal] = useState<boolean>(false);
  const [showEditModal, setEditModal] = useState<boolean>(false);

  const newButtonRef = useRef<HTMLButtonElement | null>(null);
  const newInlineButtonRef = useRef<HTMLButtonElement | null>(null);
  const editButtonRef = useRef<HTMLButtonElement | null>(null);

  [newButtonRef, newInlineButtonRef, editButtonRef].forEach(useTooltip);

  const { getMethodByObjectId, setObject, setMethod } = useOpcuaServerBound();

  const object = useOpcuaServerBound((s) => s.getObjectById(id));

  return (
    <>
      <div className="d-flex align-items-center justify-content-between pt-2 ps-2 pb-2">
        <span className="d-flex gap-2 align-items-center">
          <button
            ref={editButtonRef}
            className="btn btn-sm btn-success"
            onClick={() => setEditModal(true)}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Edit Object"
          >
            <i className="bi bi-pencil"></i>
          </button>
          Object: <strong className="text-dark-emphasis">{object?.name}</strong>
        </span>
        <div className="d-flex align-items-center justify-content-center gap-2">
          <span className="badge text-bg-warning rounded-pill">
            {getMethodByObjectId(id).length !== 1
              ? `${getMethodByObjectId(id).length} Methods`
              : `${getMethodByObjectId(id).length} Method`}
          </span>
          <button
            ref={newButtonRef}
            className="btn btn-warning"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="New Method"
            onClick={() => {
              setNewModal(true);
            }}
          >
            <i className="bi bi-plus"></i>
          </button>
        </div>
      </div>
      <hr className="divider mt-2 mb-2"></hr>

      {getMethodByObjectId(id).length === 0 ? (
        <ul className="list-group">
          <li className="list-group-item d-flex gap-2 align-items-center">
            No Methods! Add one
            <button
              ref={newInlineButtonRef}
              className="btn btn-sm btn-warning"
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="New Method"
              onClick={() => setNewModal(true)}
            >
              <i className="bi bi-plus"></i>
            </button>
          </li>
        </ul>
      ) : (
        <>
          <ul className="list-group">
            {getMethodByObjectId(id).map((v) => (
              <li
                id={v.id}
                key={v.id}
                className="list-group-item list-group-item-warning d-flex flex-column pt-2 pb-2 ps-2"
              >
                <OpcuaMethodListItem id={v.id}></OpcuaMethodListItem>
              </li>
            ))}
          </ul>
        </>
      )}

      {showNewModal && (
        <NewOpcuaMethodModal
          objectId={id}
          onClose={() => {
            setNewModal(false);
          }}
          onSave={(result) => {
            setMethod(result);
          }}
        ></NewOpcuaMethodModal>
      )}

      {showEditModal && object && (
        <EditOpcuaObjectModal
          data={object}
          onClose={() => setEditModal(false)}
          onUpdate={setObject}
        ></EditOpcuaObjectModal>
      )}
    </>
  );
}
