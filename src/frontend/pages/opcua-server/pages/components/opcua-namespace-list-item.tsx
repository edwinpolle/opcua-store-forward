import { useRef, useState } from "react";
import { OpcuaObjectListItem } from "./opcua-object-list-item";
import { NewOpcuaObjectModal } from "./modals/new-opcua-object-modal";
import { EditOpcuaNamespaceModal } from "./modals/edit-opcua-namespace-modal";
import { useOpcuaServerBound } from "../../services/opcua-server.service";
import { useTooltip } from "../../../../helper/tooltip-helper";
import { OrderOpcuaObjectModal } from "./modals/order-opcua-object-modal";

type Props = {
  id: string;
};

export function OpcuaNamespaceListItem({ id }: Props) {
  const [showNewObjectModal, setNewObjectModal] = useState<boolean>(false);
  const [showEditNamespaceModal, setEditNamespaceModal] =
    useState<boolean>(false);
  const [showReorderObjectModal, setReorderObjectModal] =
    useState<boolean>(false);

  const namespace = [...useOpcuaServerBound().namespaces.values()].find(
    (v) => v.id === id,
  );

  const { getObjectsByNamespaceId, setNamespace, setObject, updateObject } =
    useOpcuaServerBound();

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const inlineButtonRef = useRef<HTMLButtonElement | null>(null);
  const editButtonRef = useRef<HTMLButtonElement | null>(null);
  const orderButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleExternalLink = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    url: string,
  ) => {
    e.preventDefault();

    window.api.openExternalLink(url);
  };

  [buttonRef, inlineButtonRef, editButtonRef, orderButtonRef].forEach(
    useTooltip,
  );

  return (
    <>
      <div className="d-flex align-items-center justify-content-between pt-2 pb-2 ps-2 gap-2">
        <span
          className="d-flex gap-2 align-items-center"
          style={{ whiteSpace: "nowrap" }}
        >
          <button
            ref={editButtonRef}
            className="btn btn-sm btn-primary"
            onClick={() => {
              setEditNamespaceModal(true);
            }}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Edit Namespace"
          >
            <i className="bi bi-pencil"></i>
          </button>
          Namespace:
          <strong className="text-dark-emphasis">{namespace?.name}</strong>
          <a
            style={{ textOverflow: "ellipsis" }}
            href={"#"}
            onClick={(e) => handleExternalLink(e, namespace!.url)}
            target="_blank"
          >
            {namespace?.url}
          </a>
        </span>

        <div className="d-flex gap-2 align-items-center justify-content-center">
          <span className="badge text-bg-success rounded-pill">
            {getObjectsByNamespaceId(id).length !== 1
              ? `${getObjectsByNamespaceId(id).length} Objects`
              : `${getObjectsByNamespaceId(id).length} Object`}
          </span>
          <button
            ref={buttonRef}
            className="btn btn-success"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="New Object"
            onClick={() => setNewObjectModal(true)}
          >
            <i className="bi bi-plus"></i>
          </button>

          <button
            ref={orderButtonRef}
            className={`btn btn-success ${getObjectsByNamespaceId(id).length === 0 ? "disabled" : ""}`}
            data-bs-toogle="tooltip"
            data-bs-placement="top"
            title="Order Objects"
            onClick={() => setReorderObjectModal(true)}
          >
            <i className="bi bi-list"></i>
          </button>
        </div>
      </div>
      <hr className="divider mt-2 mb-2"></hr>

      <ul className="list-group">
        {getObjectsByNamespaceId(id).length === 0 ? (
          <ul className="list-group">
            <li className="list-group-item d-flex gap-2 align-items-center">
              No Obejcts! Add one
              <button
                ref={inlineButtonRef}
                className="btn btn-sm btn-success"
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                title="New Object"
                onClick={() => setNewObjectModal(true)}
              >
                <i className="bi bi-plus"></i>{" "}
              </button>
            </li>
          </ul>
        ) : (
          <ul className="list-group">
            {getObjectsByNamespaceId(id)
              .sort((a, b) => a.order - b.order)
              .map((v) => (
                <li
                  id={v.id}
                  key={v.id}
                  className="list-group-item list-group-item-success d-flex flex-column pt-2 pb-2 ps-2"
                >
                  <OpcuaObjectListItem id={v.id}></OpcuaObjectListItem>
                </li>
              ))}
          </ul>
        )}
      </ul>

      {showNewObjectModal && (
        <NewOpcuaObjectModal
          namespaceId={id}
          order={getObjectsByNamespaceId(id).length + 1}
          onClose={() => setNewObjectModal(false)}
          onSave={(result) => setObject(result)}
        ></NewOpcuaObjectModal>
      )}

      {showEditNamespaceModal && namespace && (
        <EditOpcuaNamespaceModal
          data={namespace}
          onClose={() => setEditNamespaceModal(false)}
          onUpdate={(dto) => {
            setNamespace(dto);
          }}
        ></EditOpcuaNamespaceModal>
      )}

      {showReorderObjectModal && namespace && (
        <OrderOpcuaObjectModal
          data={getObjectsByNamespaceId(namespace.id)}
          onClose={() => setReorderObjectModal(false)}
          onUpdate={(dto) => {
            updateObject(dto);
          }}
        ></OrderOpcuaObjectModal>
      )}
    </>
  );
}
