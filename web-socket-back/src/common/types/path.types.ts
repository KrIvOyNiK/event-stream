export type Path<T> = T extends object
  ? {
      [K in keyof T]: `${Exclude<K, symbol>}${'' | `.${Path<T[K]>}`}`;
    }[keyof T]
  : never;

export type PathIndex<T, K extends string> = K extends keyof T
  ? T[K]
  : K extends `${infer K0}.${infer KR}`
    ? K0 extends keyof T
      ? PathIndex<T[K0], KR>
      : never
    : never;
