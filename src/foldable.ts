interface Foldable<Cases extends {
  [key: string]: any;
}> {
  fold<N extends Functor<any>>(match: {
    [key in keyof Cases]: Cases[key] extends (undefined | null)
      ? (value?: Cases[key]) => N
      : (value: Cases[key]) => N
  }): N;
}