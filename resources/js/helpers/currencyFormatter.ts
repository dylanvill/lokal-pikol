const currencyFormatter = (amount: number): string => {
    return Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'PHP',
    }).format(amount);
};

export default currencyFormatter;
