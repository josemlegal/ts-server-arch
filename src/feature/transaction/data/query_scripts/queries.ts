export const SELECT_TRANSACTIONS_QUERY = `SELECT * FROM public.transactions;`;

export const SELECT_TRANSACTION_QUERY = `SELECT * FROM public.transactions WHERE id = $1;`;

export const INSERT_TRANSACTION_QUERY = `
INSERT INTO public.transactions (title, description, amount)
VALUES ($1, $2, $3)
RETURNING *;
`;

export const UPDATE_TRANSACTION_QUERY = `
UPDATE public.transactions
SET title=$2, description=$3, amount=$4
WHERE id=$1 RETURNING *;
`;
