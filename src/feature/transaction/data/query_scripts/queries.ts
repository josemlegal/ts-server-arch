export const SELECT_TRANSACTIONS_QUERY = `SELECT * FROM public.transaction;`;

export const INSERT_TRANSACTION_QUERY = `
INSERT INTO public.transaction (title, description, amount)
VALUES ($1, $2, $3)
RETURNING *;
`;
