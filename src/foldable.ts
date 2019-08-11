interface Foldable<Cases extends {
  [key: string]: any;
}> {
  fold<N extends Functor<any>>(match: {
    [key in keyof Cases]: (value: Cases[key]) => N
  }): N;
}