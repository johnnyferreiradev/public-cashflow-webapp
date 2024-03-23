export const formatCurrency = (
  value: string | number,
  currencyCode?: string,
  locale?: string,
): string => {
  try {
    const numericValue: number =
      typeof value === 'string' ? parseFloat(value) : value;

    const formattedValue: string = numericValue.toLocaleString(
      locale || 'pt-BR',
      {
        style: 'currency',
        currency: currencyCode || 'BRL',
      },
    );

    return formattedValue;
  } catch (error) {
    return 'Error: The provided value is not valid.';
  }
};

export const extractCurrencyValue = (currencyString: string): number => {
  const numericString = currencyString.replace(/[^\d.,-]/g, '');
  const formattedNumericString = numericString.replace(',', '.');
  const numericValue: number = parseFloat(formattedNumericString);

  if (isNaN(numericValue)) {
    throw new Error('Invalid format');
  }

  return numericValue;
};
