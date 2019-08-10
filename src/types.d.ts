interface Foldable<Cases extends string> {
  fold<N extends Functor<any>>(match: {
    [key in Cases]: (x: any) => N
  }): N;
}