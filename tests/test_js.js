const assert = require('assert');
const {
  getAll,
  getByPostalCode,
  search,
  getByDistrict,
  getByProvince,
  getDistricts,
  getProvinces,
  getGrouped
} = require('../src/index.js');

console.log('--- Running JavaScript Unit Tests ---');

// Test 1: getAll()
const all = getAll();
assert.strictEqual(all.length, 2111, `Expected 2111 records, got ${all.length}`);
console.log('✓ getAll() returns 2111 records');

// Test 2: getByPostalCode()
const akurana = getByPostalCode('20850');
assert.ok(akurana, 'Expected record for 20850');
assert.strictEqual(akurana.place_name, 'Akurana');
assert.strictEqual(akurana.district_name, 'Kandy');
assert.strictEqual(akurana.district_code, 'KY');
assert.strictEqual(akurana.province, 'Central Province');
assert.strictEqual(akurana.post_office_type, 'Main Post Office');
console.log('✓ getByPostalCode("20850") matched Akurana correctly');

// Test 3: Corrected typo Mulkiriyawa (50324)
const mulkiriyawa = getByPostalCode('50324');
assert.ok(mulkiriyawa);
assert.strictEqual(mulkiriyawa.place_name, 'Mulkiriyawa');
assert.strictEqual(mulkiriyawa.district_name, 'Anuradhapura');
assert.strictEqual(mulkiriyawa.post_office_type, 'Sub Post Office');
console.log('✓ Corrected entry 50324 matched Mulkiriyawa');

// Test 4: Devinuwara (81160)
const devinuwara = getByPostalCode('81160');
assert.ok(devinuwara);
assert.strictEqual(devinuwara.place_name, 'Devinuwara');
assert.strictEqual(devinuwara.district_name, 'Matara');
assert.strictEqual(devinuwara.alt_name, undefined, 'alt_name should not be present');
console.log('✓ getByPostalCode("81160") verified Devinuwara without alt_name');

// Test 5: Number input handling
const numLookup = getByPostalCode(20850);
assert.strictEqual(numLookup.place_name, 'Akurana');
console.log('✓ Number input to getByPostalCode(20850) works');

// Test 6: getByDistrict() by name and code
const kandyByName = getByDistrict('Kandy');
const kandyByCode = getByDistrict('KY');
assert.strictEqual(kandyByName.length, 179, `Expected 179 Kandy records, got ${kandyByName.length}`);
assert.strictEqual(kandyByCode.length, 179, `Expected 179 KY records, got ${kandyByCode.length}`);
console.log('✓ getByDistrict() works for both name and abbreviation');

// Test 7: getByProvince()
const wp = getByProvince('Western Province');
assert.strictEqual(wp.length, 279, `Expected 279 Western Province records, got ${wp.length}`);
console.log('✓ getByProvince("Western Province") returned 279 records');

// Test 8: search()
const searchRes = search('kandy');
assert.ok(searchRes.length > 0);
const searchLimit = search('a', { limit: 5 });
assert.strictEqual(searchLimit.length, 5);
const filteredSearch = search('galle', { province: 'Southern Province' });
assert.ok(filteredSearch.every(r => r.province === 'Southern Province'));
console.log('✓ search() with query, limit, and province filter works');

// Test 9: getDistricts() & getProvinces()
const districts = getDistricts();
const provinces = getProvinces();
assert.strictEqual(districts.length, 25, `Expected 25 districts, got ${districts.length}`);
assert.strictEqual(provinces.length, 9, `Expected 9 provinces, got ${provinces.length}`);
console.log('✓ getDistricts() has 25 districts and getProvinces() has 9 provinces');

// Test 10: getGrouped()
const grouped = getGrouped();
assert.strictEqual(Object.keys(grouped).length, 9);
assert.ok(grouped['Western Province']['Colombo'].length > 0);
console.log('✓ getGrouped() returns valid nested hierarchy');

console.log('\n All JavaScript tests passed successfully! \n');
