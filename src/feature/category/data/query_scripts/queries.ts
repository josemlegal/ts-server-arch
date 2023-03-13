export const SELECT_CATEGORY_QUERY = `SELECT * FROM public.category;`;

export const SELECT_CATEGORIES_QUERY = `SELECT * FROM public.category WHERE id = $1;`;

export const INSERT_CATEGORY_QUERY = `
INSERT INTO public.category (title, description, amount)
VALUES ($1, $2, $3)
RETURNING *;
`;

export const UPDATE_CATEGORY_QUERY = `
UPDATE public.category
SET title=$2, description=$3, amount=$4
WHERE id=$1 RETURNING *;
`;

export const DELETE_CATEGORY_QUERY = `
DELETE from public.category
WHERE id=$1 RETURNING *;
`;
