import { base } from '$app/paths';
// import { cons } from 'effect/List';

export const href = (route: string) => {
	return base ? `${base}${route}` : route;
};

// export const asset = (route: string) => {
// 	const s = import(route)
// 	return route;
// };
