export function concatenate (obj) {
  return (obj || [])
    .map(({ name }) => name)
    .join(', ')
}
