export type UuidString = string;

export type NumberAsString = string;

/**
 * Indicates that this type should be exactly
 * the number of characters specified.
 */
export type Char<T extends NumberAsString> = T;
