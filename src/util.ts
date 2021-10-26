const prop = <T extends object, K extends keyof T>(key: K) => (obj: T) => obj[key];

interface Concat {
  concat: Function;
}

const concat = <A extends Concat>(a: A) => <B extends A>(b: B): B => a.concat(b);
const append = <A extends Concat>(a: A) => <B extends A>(b: B): B => b.concat(a);

interface Includes<V> {
  includes(value: V): boolean;
}

const includes = <P>(part: P) => (whole: Includes<P>) => whole.includes(part);

const partOf = <I extends Includes<any>>(
  a: I
) => <B extends I extends Includes<infer U> ? U : any>(
  b: B
) => a.includes(b);
