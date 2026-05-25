declare module "date-fns" {
	export function format(
		date: Date | number | string,
		formatStr: string,
	): string;
	export function isValid(date: unknown): boolean;
	export function parseISO(argument: string): Date;
}
