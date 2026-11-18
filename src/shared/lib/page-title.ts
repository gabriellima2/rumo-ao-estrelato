export const APP_NAME = 'Rumo ao Estrelato'

export function formatPageTitle(page: string) {
	return `${page} | ${APP_NAME}`
}

export function getRouteHead(page: string) {
	return () => ({
		meta: [{ title: formatPageTitle(page) }],
	})
}
