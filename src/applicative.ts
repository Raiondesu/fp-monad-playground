type Apply<T, This extends Applicative<any>> = T extends (x: infer FT) => infer N
  ? <F extends Functor<FT>['map']>(f: F) => ReturnType<F>
  : (f: any) => This;

const isApplicable = <T = any, R = any>(v: any): v is ((x: T) => R) => typeof v === 'function';

abstract class Applicative<T> extends Monad<T> {
  apply<N extends Functor<any>>(f: N) {
    // return this.chain(f.map);
  }
}