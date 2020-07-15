export const formatDate = (date: Date) => {
  const [dateValue, hours, minutes] = date.toISOString().split(/[T|Z|:]/)
  return [dateValue.replace(/-/g, '.'), [hours, minutes].join(':')].join(' ')
}
