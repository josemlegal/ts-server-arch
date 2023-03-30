export const SELECT_TRANSACTION_TYPES_QUERY = `SELECT * FROM public.transaction_type;`;

export const SELECT_TRANSACTION_TYPE_QUERY = `SELECT * FROM public.transaction_type WHERE id = $1;`;

export const INSERT_TRANSACTION_TYPE_QUERY = `
INSERT INTO public.transaction_type (type)
VALUES ($1)
RETURNING *;
`;

export const UPDATE_TRANSACTION_TYPE_QUERY = `
UPDATE public.transaction_type
SET type=$2
WHERE id=$1 RETURNING *;
`;

export const DELETE_TRANSACTION_TYPE_QUERY = `
DELETE from public.transaction_type
WHERE id=$1 RETURNING *;
`;
