export const prop = <T extends object, K extends keyof T>(key: K) => (obj: T) => obj[key];

interface Concat {
  concat: Function;
}

export const concat = <A extends Concat>(a: A) => <B extends A>(b: B): B => a.concat(b);
export const append = <A extends Concat>(a: A) => <B extends A>(b: B): B => b.concat(a);

