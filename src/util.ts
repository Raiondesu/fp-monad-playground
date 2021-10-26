const prop = <T extends object, K extends keyof T>(key: K) => (obj: T) => obj[key];

interface Concat {
  concat: Function;
}

const concat = <A extends Concat>(a: A) => <B extends A>(b: B): B => a.concat(b);
const append = <A extends Concat>(a: A) => <B extends A>(b: B): B => b.concat(a);

interface Includes {
  includes(value: any): boolean;
}