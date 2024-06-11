export function updateNestedObject(
  updateData: Record<string, any>,
  nestedObject: Record<string, any>,
  keyPrefix: string = '',
): void {
  for (const [key, value] of Object.entries(nestedObject)) {
    const fullKey = keyPrefix ? `${keyPrefix}.${key}` : key;

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      updateNestedObject(updateData, value, fullKey);
    } else {
      updateData[fullKey] = value;
    }
  }
}
