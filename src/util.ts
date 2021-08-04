type M = HTMLElementTagNameMap;

export const createElement = <T extends keyof M>(tagName: T, props?: Partial<M[T]>): M[T] => {
  return Object.assign(document.createElement<T>(tagName), props);
};
