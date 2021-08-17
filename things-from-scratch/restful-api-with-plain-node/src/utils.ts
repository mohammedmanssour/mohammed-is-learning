export const uniqueId = (prefix?: string): string => {
  return '_' + (prefix || '') + Math.random().toString(36).substr(2, 9);
};
