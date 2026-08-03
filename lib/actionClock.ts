type Listener = () => void;

let lastSentAt = 0;
const listeners = new Set<Listener>();

export function recordActionSent() {
  lastSentAt = Date.now();
  listeners.forEach((listener) => listener());
}

export function getLastActionSentAt() {
  return lastSentAt;
}

export function subscribeActionSent(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
