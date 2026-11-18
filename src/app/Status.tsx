import { CheckCircle2, Database, LoaderCircle, WifiOff, AlertCircle } from 'lucide-react';
import { hydrateUserData, usePersistenceStore } from '../stores/atlas';

export function Status() {
  const status = usePersistenceStore((s) => s.status);
  const offline = usePersistenceStore((s) => s.offline);
  const error = usePersistenceStore((s) => s.error);
  return (
    <div
      className={`save-status ${status === 'error' ? 'status-error' : ''}`}
      role="status"
      aria-live="polite"
    >
      {status === 'saving' || status === 'loading' ? (
        <LoaderCircle size={22} className="spin" />
      ) : status === 'error' ? (
        <AlertCircle size={22} />
      ) : offline ? (
        <WifiOff size={22} />
      ) : (
        <CheckCircle2 size={22} />
      )}
      <div>
        <strong>
          {status === 'loading'
            ? 'Abrindo dados locais…'
            : status === 'saving'
              ? 'Salvando neste aparelho…'
              : status === 'error'
                ? 'Os dados locais precisam de atenção'
                : offline
                  ? 'Offline · dados locais prontos'
                  : 'Dados salvos'}
        </strong>
        <small>{error || 'Seus lugares ficam neste aparelho'}</small>
        {status === 'error' && (
          <button className="text-button" onClick={() => void hydrateUserData()}>
            Retry storage
          </button>
        )}
      </div>
      <Database size={14} aria-hidden="true" />
    </div>
  );
}
