/**
 * Utility function to conditionally join class names together
 * @param classes - Array of class names, booleans, or undefined values
 * @returns String of joined class names
 */
export function cn(...classes: (string | undefined | boolean | null)[]) {
  return classes.filter(Boolean).join(' ');
} 