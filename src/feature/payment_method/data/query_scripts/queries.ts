export const SELECT_PAYMENT_METHODS_QUERY = `SELECT * FROM public.payment-method;`;

export const SELECT_PAYMENT_METHOD_QUERY = `SELECT * FROM public.payment-method WHERE id = $1;`;

export const INSERT_PAYMENT_METHOD_QUERY = `
INSERT INTO public.payment-method (title)
VALUES ($1)
RETURNING *;
`;

export const UPDATE_PAYMENT_METHOD_QUERY = `
UPDATE public.payment-method
SET title=$2, 
WHERE id=$1 RETURNING *;
`;

export const DELETE_PAYMENT_METHOD_QUERY = `
DELETE from public.payment-method
WHERE id=$1 RETURNING *;
`;
