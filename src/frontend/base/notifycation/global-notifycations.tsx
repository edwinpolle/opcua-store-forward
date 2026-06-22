import { useNotifycationStore } from "../../components/notification/notifycationt-service";

//type Notifycation

export function GlobalNotifycation() {
  const notifycation = useNotifycationStore((s) => s.notifycations);
  const { remove } = useNotifycationStore();

  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3">
      {notifycation.map((n) => {
        return (
          <div
            key={n.id}
            id="liveToast"
            className={`toast text-bg-${n.variant} show`}
            role="alert"
          >
            <div className="toast-header">
              <strong className="me-auto">{n.header}</strong>
              <button
                type="button"
                className="btn-close"
                onClick={() => remove(n.id)}
              ></button>
            </div>
            <div className="toast-body">{n.message}</div>
          </div>
        );
      })}
    </div>
  );
}
