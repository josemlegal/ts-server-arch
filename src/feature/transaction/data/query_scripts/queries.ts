export const SELECT_TRANSACTIONS_QUERY = `SELECT * FROM public.transactions;`;

export const INSERT_TRANSACTION_QUERY = `
INSERT INTO public.transactions (title, description, amount)
VALUES ($1, $2, $3)
RETURNING *;
`;
