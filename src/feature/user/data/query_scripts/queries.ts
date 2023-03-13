export const SELECT_USERS_QUERY = `SELECT * FROM public.user;`;

export const SELECT_USER_QUERY = `SELECT * FROM public.user WHERE id = $1;`;

export const INSERT_USER_QUERY = `
INSERT INTO public.user (name, email, password)
VALUES ($1, $2, $3)
RETURNING *;
`;

export const UPDATE_USER_QUERY = `
UPDATE public.user
SET name=$2, email=$3, password=$4
WHERE id=$1 RETURNING *;
`;

export const DELETE_USER_QUERY = `
DELETE from public.user
WHERE id=$1 RETURNING *;
`;
