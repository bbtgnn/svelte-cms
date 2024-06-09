import { base } from '$app/paths';

export const href = (route: string) => {
	return base ? `${base}${route}` : route;
};
