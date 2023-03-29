export const SELECT_TRANSACTIONS_QUERY = `SELECT * FROM public.transaction;`;

export const SELECT_TRANSACTION_QUERY = `SELECT * FROM public.transaction WHERE id = $1;`;

export const INSERT_TRANSACTION_QUERY = `
INSERT INTO public.transaction (title, description, amount, user_id, category_id, payment_method_id)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *;
`;

export const UPDATE_TRANSACTION_QUERY = `
UPDATE public.transaction
SET title=$2, description=$3, amount=$4, user_id=$5, category_id=$6, payment_method_id=$7
WHERE id=$1 RETURNING *;
`;

export const DELETE_TRANSACTION_QUERY = `
DELETE from public.transaction
WHERE id=$1 RETURNING *;
`;
