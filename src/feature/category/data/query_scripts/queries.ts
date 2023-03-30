export const SELECT_CATEGORIES_QUERY = `SELECT * FROM public.category;`;

export const SELECT_CATEGORY_QUERY = `SELECT * FROM public.category WHERE id = $1;`;

export const INSERT_CATEGORY_QUERY = `
INSERT INTO public.category (title, transaction_type_id)
VALUES ($1, $2)
RETURNING *;
`;

export const UPDATE_CATEGORY_QUERY = `
UPDATE public.category
SET title=$2, transaction_type_id=$3
WHERE id=$1 RETURNING *;
`;

export const DELETE_CATEGORY_QUERY = `
DELETE from public.category
WHERE id=$1 RETURNING *;
`;
