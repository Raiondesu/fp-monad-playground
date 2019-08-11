interface Identity<T> extends Monad<T> {
  map<N>(f: (x: T) => N): Identity<N>;
}

const identity = <T>(value: T): Identity<T> => {
  const id: Identity<T> = monad({
    map: <N>(f: (x: T) => N) => identity(f(value)),
    
    chain: <N extends Monad<any>>(fn: (x: T) => N): N => fn(value),

    join: (isFunctor<T>(value)
      ? isMonad<T>(value)
        ? () => value.join()
        : () => value
      : () => id
    ) as Join<T, Identity<T>>,

    apply: (isApplicable(value)
      ? (f: any) => f.map(value)
      : function (this: any) { return this; }
    ) as Apply<T, Identity<T>>,

    toString: () => `Identity(${value})`,
  });

  return id;
}
