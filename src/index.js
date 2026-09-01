'use strict';

const rawData = require('../data/postal_codes.json');

// Build index maps for fast O(1) lookups
const codeMap = new Map();
const districtMap = new Map();
const provinceMap = new Map();

for (let i = 0; i < rawData.length; i++) {
  const item = rawData[i];
  codeMap.set(item.postal_code, item);

  const dKey = item.district_name.toLowerCase();
  const dCodeKey = item.district_code.toLowerCase();
  if (!districtMap.has(dKey)) districtMap.set(dKey, []);
  if (!districtMap.has(dCodeKey)) districtMap.set(dCodeKey, []);
  districtMap.get(dKey).push(item);
  if (dCodeKey !== dKey) {
    districtMap.get(dCodeKey).push(item);
  }

  const pKey = item.province.toLowerCase();
  if (!provinceMap.has(pKey)) provinceMap.set(pKey, []);
  provinceMap.get(pKey).push(item);
}

const DISTRICT_LIST = Array.from(
  new Set(rawData.map((r) => r.district_name))
).sort();

const PROVINCE_LIST = Array.from(
  new Set(rawData.map((r) => r.province))
).sort();

function getAll() {
  return rawData;
}

function getByPostalCode(code) {
  if (code === undefined || code === null) return undefined;
  const strCode = String(code).trim().padStart(5, '0');
  return codeMap.get(strCode);
}

function search(query, options) {
  if (!query || typeof query !== 'string') return [];
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const opts = options || {};
  const limit = typeof opts.limit === 'number' && opts.limit > 0 ? opts.limit : Infinity;
  const filterDistrict = opts.district ? opts.district.trim().toLowerCase() : null;
  const filterProvince = opts.province ? opts.province.trim().toLowerCase() : null;

  const results = [];
  for (let i = 0; i < rawData.length; i++) {
    const item = rawData[i];

    if (filterDistrict && item.district_name.toLowerCase() !== filterDistrict && item.district_code.toLowerCase() !== filterDistrict) {
      continue;
    }
    if (filterProvince && item.province.toLowerCase() !== filterProvince) {
      continue;
    }

    if (
      item.place_name.toLowerCase().includes(q) ||
      item.postal_code.includes(q) ||
      item.district_name.toLowerCase().includes(q)
    ) {
      results.push(item);
      if (results.length >= limit) break;
    }
  }

  return results;
}

function getByDistrict(district) {
  if (!district || typeof district !== 'string') return [];
  const key = district.trim().toLowerCase();
  return districtMap.get(key) || [];
}

function getByProvince(province) {
  if (!province || typeof province !== 'string') return [];
  const key = province.trim().toLowerCase();
  return provinceMap.get(key) || [];
}

function getDistricts() {
  return DISTRICT_LIST;
}

function getProvinces() {
  return PROVINCE_LIST;
}

let _groupedDataCache = null;

function getGrouped() {
  if (_groupedDataCache) return _groupedDataCache;
  const grouped = {};
  for (let i = 0; i < rawData.length; i++) {
    const item = rawData[i];
    const prov = item.province;
    const dist = item.district_name;
    if (!grouped[prov]) grouped[prov] = {};
    if (!grouped[prov][dist]) grouped[prov][dist] = [];
    grouped[prov][dist].push(item);
  }
  _groupedDataCache = grouped;
  return _groupedDataCache;
}

module.exports = {
  getAll,
  getByPostalCode,
  search,
  getByDistrict,
  getByProvince,
  getDistricts,
  getProvinces,
  getGrouped,
  default: {
    getAll,
    getByPostalCode,
    search,
    getByDistrict,
    getByProvince,
    getDistricts,
    getProvinces,
    getGrouped
  }
};
