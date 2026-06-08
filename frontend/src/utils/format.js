export const formatCurrency = (value) =>
  new Intl.NumberFormat('sq-AL', {
    style: 'currency',
    currency: 'ALL',
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

export const formatDateTime = (value) => {
  if (!value) return '-';
  return new Intl.DateTimeFormat('sq-AL', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
};

export const toInputDateValue = (value) => {
  if (!value) return '';
  const date = new Date(value);
  return date.toISOString().split('T')[0];
};
