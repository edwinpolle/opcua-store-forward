import { useRef, useState } from "react";
import { useTooltip } from "../../../../helper/tooltip-helper";
import { useOpcuaServerBound } from "../../services/opcua-server.service";
import { EditOpcuaInputArgumentModal } from "./modals/edit-opcua-input-argument-modal";

type Props = {
  id: string;
};

export function OpcuaInputArgumentListItem({ id }: Props) {
  const [showEditModal, setEditModal] = useState<boolean>(false);

  const editButtonRef = useRef<HTMLButtonElement | null>(null);

  [editButtonRef].forEach(useTooltip);

  const { setInputArgument } = useOpcuaServerBound();

  const inputArgument = useOpcuaServerBound((s) => s.getInputArgumentById(id));

  return (
    <>
      <div className="d-flex gap-2">
        <button
          ref={editButtonRef}
          className="btn btn-sm btn-info"
          onClick={() => setEditModal(true)}
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Edit Input Argument"
        >
          <i className="bi bi-pencil"></i>
        </button>

        <span className="flex-fill">{inputArgument?.name}</span>

        <span>{inputArgument?.dataType}</span>
      </div>

      {showEditModal && inputArgument && (
        <EditOpcuaInputArgumentModal
          data={inputArgument}
          onClose={() => setEditModal(false)}
          onUpdate={setInputArgument}
        ></EditOpcuaInputArgumentModal>
      )}
    </>
  );
}
