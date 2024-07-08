const isObject = (value: any): value is object => {
  return !!value && value.constructor === Object;
};

export const merge = <T>(initial: T, override: T): T => {
  if (!initial || !override) {
    return initial ?? override ?? ({} as T);
  }
  return Object.entries({ ...initial, ...override }).reduce<T>(
    (acc, [key, value]) => ({
      ...acc,
      [key]: isObject(initial[key]) ? merge(initial[key], value) : value,
    }),
    {} as T,
  );
};
