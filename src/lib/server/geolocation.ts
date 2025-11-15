import type { GeoLocation } from '$lib/interfaces/geolocation';
import { Reader } from '@maxmind/geoip2-node';
import { GEOLITE2_DB_PATH } from '$env/static/private';

let reader: Reader | null = null;

const getReader = async () => {
	if (!reader) {
		try {
			const dbPath = GEOLITE2_DB_PATH;
			reader = await Reader.open(dbPath);
			console.log('MaxMind GeoIP2 database loaded successfully');
		} catch (error) {
			console.error('Failed to load GeoIP2 database:', error);
			throw error;
		}
	}
	return reader;
};

export const getGeolocation = async (ip: string): Promise<GeoLocation> => {
	try {
		const geoReader = await getReader();
		const response = geoReader.city(ip);

		return {
			country: response.country?.names?.en || 'Unknown',
			city: response.city?.names?.en || 'Unknown',
			region: response.subdivisions?.[0]?.names?.en || 'Unknown'
		};
	} catch (error) {
		console.error('Geolocation lookup failed for IP:', ip, error);

		return {
			country: 'Unknown',
			city: 'Unknown',
			region: 'Unknown'
		};
	}
};
