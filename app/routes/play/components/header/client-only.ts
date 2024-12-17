import { useSyncExternalStore } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-function
const emptySubscribe = () => () => {};

export function ClientOnly({ children }: { children: () => JSX.Element }) {
  const isServer = useSyncExternalStore(
    emptySubscribe,
    () => false,
    () => true
  );

  return isServer ? null : children();
}
