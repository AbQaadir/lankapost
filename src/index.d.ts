export interface PostalRecord {
  postal_code: string;
  place_name: string;
  district_code: string;
  district_name: string;
  province: string;
  post_office_type: 'Main Post Office' | 'Sub Post Office';
}

export interface SearchOptions {
  limit?: number;
  district?: string;
  province?: string;
}

export interface GroupedPostalData {
  [province: string]: {
    [district: string]: Array<{
      postal_code: string;
      place_name: string;
      post_office_type: string;
    }>;
  };
}

/**
 * Returns an array of all 2,111 Sri Lankan postal records.
 */
export function getAll(): PostalRecord[];

/**
 * Looks up a postal record by its 5-digit postal code.
 * @param code - 5-digit postal code (e.g. '00100', '20850', '40150')
 */
export function getByPostalCode(code: string | number): PostalRecord | undefined;

/**
 * Searches postal records by place name, district, or postal code query.
 * @param query - Search term (case-insensitive substring match)
 * @param options - Optional filters (limit, district, province)
 */
export function search(query: string, options?: SearchOptions): PostalRecord[];

/**
 * Returns all postal records belonging to a specific district.
 * Matches by full district name (e.g. 'Kandy') or district code (e.g. 'KY').
 * @param district - District name or 2-3 letter district code
 */
export function getByDistrict(district: string): PostalRecord[];

/**
 * Returns all postal records belonging to a specific province.
 * @param province - Province name (e.g. 'Western Province', 'Central Province')
 */
export function getByProvince(province: string): PostalRecord[];

/**
 * Returns a list of all 25 Sri Lankan administrative districts.
 */
export function getDistricts(): string[];

/**
 * Returns a list of all 9 Sri Lankan provinces.
 */
export function getProvinces(): string[];

/**
 * Returns the hierarchical data grouped by Province and District.
 */
export function getGrouped(): GroupedPostalData;

export default {
  getAll,
  getByPostalCode,
  search,
  getByDistrict,
  getByProvince,
  getDistricts,
  getProvinces,
  getGrouped
};
