type Apply<T, This> = T extends (x: infer FT) => infer N
  ? <F extends Functor<FT>>(f: F) => Functor<N>
  : (f: any) => This;

const isApplicable = <T = any, R = any>(v: any): v is (x: T) => R => typeof v === 'function';

interface Applicative<T> extends Functor<T> {
  apply: Apply<T, this>;
}