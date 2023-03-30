export const SELECT_PAYMENT_METHODS_QUERY = `SELECT * FROM public.payment_method;`;

export const SELECT_PAYMENT_METHOD_QUERY = `SELECT * FROM public.payment_method WHERE id = $1;`;

export const INSERT_PAYMENT_METHOD_QUERY = `
INSERT INTO public.payment_method (title, user_id)
VALUES ($1, $2)
RETURNING *;
`;

export const UPDATE_PAYMENT_METHOD_QUERY = `
UPDATE public.payment_method
SET title=$2, user_id=$3
WHERE id=$1 RETURNING *;
`;

export const DELETE_PAYMENT_METHOD_QUERY = `
DELETE from public.payment_method
WHERE id=$1 RETURNING *;
`;
