# 🇱🇰 Sri Lanka Postal Codes (`lanka-postal-codes`)

[![npm version](https://img.shields.io/npm/v/lanka-postal-codes.svg?color=blue)](https://www.npmjs.com/package/lanka-postal-codes)
[![PyPI version](https://img.shields.io/pypi/v/lanka-postal-codes.svg?color=green)](https://pypi.org/project/lanka-postal-codes/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Records Count](https://img.shields.io/badge/Records-2%2C111%20Cleaned-brightgreen.svg)]()
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-0-orange.svg)]()

The most comprehensive, accurate, and clean dataset of Sri Lankan Postal Codes (2,111 post offices and sub-post offices), complete with zero-dependency packages for **JavaScript / TypeScript (NPM)**, **Python (PyPI)**, and **direct global CDN access**.

---

## ⚡ Quick Links & CDN Access (No Installation Required)

Access the dataset directly over free, lightning-fast global CDNs (jsDelivr / unpkg) for Jamstack websites, mobile apps, or cURL:

- **Flat JSON Dataset (2,111 records)**:  
  `https://cdn.jsdelivr.net/gh/qaadi/lanka-postal-codes@main/data/postal_codes.json`
- **Grouped by Province & District JSON**:  
  `https://cdn.jsdelivr.net/gh/qaadi/lanka-postal-codes@main/data/postal_codes_by_district.json`
- **CSV Format**:  
  `https://cdn.jsdelivr.net/gh/qaadi/lanka-postal-codes@main/data/postal_codes.csv`

### Direct Fetch Example (Vanilla JS / React / Vue / Flutter / Mobile)
```javascript
// Fetch directly from global CDN
const response = await fetch("https://cdn.jsdelivr.net/gh/qaadi/lanka-postal-codes@main/data/postal_codes.json");
const postalCodes = await response.json();
console.log(`Loaded ${postalCodes.length} postal codes!`);
```

---

## 📦 JavaScript / TypeScript / Node.js (NPM)

### Installation
```bash
npm install lanka-postal-codes
# or
yarn add lanka-postal-codes
# or
pnpm add lanka-postal-codes
```

### Usage (ESM & TypeScript)
```typescript
import {
  getByPostalCode,
  search,
  getByDistrict,
  getByProvince,
  getAll,
  getDistricts,
  getProvinces
} from 'lanka-postal-codes';

// 1. Instant O(1) Lookup by Postal Code
const postOffice = getByPostalCode('20850');
console.log(postOffice);
/*
{
  postal_code: '20850',
  place_name: 'Akurana',
  district_code: 'KY',
  district_name: 'Kandy',
  province: 'Central Province',
  post_office_type: 'Main Post Office'
}
*/

// 2. Search by place name, district, or partial code
const results = search('colombo', { limit: 5 });

// 3. Filter by District
const kandyOffices = getByDistrict('Kandy'); // or getByDistrict('KY')

// 4. Filter by Province
const southernOffices = getByProvince('Southern Province');

// 5. Get Metadata Lists
const allDistricts = getDistricts(); // 25 districts
const allProvinces = getProvinces(); // 9 provinces
```

### Usage (CommonJS / Node.js)
```javascript
const { getByPostalCode, search, getByDistrict } = require('lanka-postal-codes');

const office = getByPostalCode('40150'); // Achchuvely, Jaffna
```

---

## 🐍 Python (PyPI)

### Installation
```bash
pip install lanka-postal-codes
```

### Usage
```python
from lanka_postal_codes import (
    get_by_postal_code,
    search,
    get_by_district,
    get_by_province,
    get_all,
    get_districts,
    get_provinces,
    get_grouped,
)

# 1. Instant O(1) Lookup
office = get_by_postal_code("20850")
print(office)
# {'postal_code': '20850', 'place_name': 'Akurana', 'district_code': 'KY',
#  'district_name': 'Kandy', 'province': 'Central Province', 'post_office_type': 'Main Post Office'}

# 2. Case-insensitive Search with Filters
results = search("galle", limit=5, province="Southern Province")

# 3. Filter by District
kandy_offices = get_by_district("Kandy")  # or get_by_district("KY")

# 4. Filter by Province
western_offices = get_by_province("Western Province")

# 5. Grouped Tree Data
tree = get_grouped()
print(tree["Western Province"]["Colombo"])
```

---

## 🎯 Dart / Flutter Example

```dart
import 'dart:convert';
import 'package:http/http.dart' as http;

Future<List<dynamic>> fetchSriLankaPostalCodes() async {
  final url = Uri.parse('https://cdn.jsdelivr.net/gh/qaadi/lanka-postal-codes@main/data/postal_codes.json');
  final response = await http.get(url);
  if (response.statusCode == 200) {
    return jsonDecode(response.body);
  }
  throw Exception('Failed to load postal codes');
}
```

---

## 📋 Data Schema

Each postal record adheres to the following structure:

| Field | Type | Description | Example |
| :--- | :--- | :--- | :--- |
| `postal_code` | `string` | Official 5-digit postal code | `"20850"` |
| `place_name` | `string` | Standardized place / town name | `"Akurana"` |
| `district_code` | `string` | 2-3 letter district code | `"KY"` |
| `district_name` | `string` | Full administrative district name | `"Kandy"` |
| `province` | `string` | Administrative province name | `"Central Province"` |
| `post_office_type` | `string` | `"Main Post Office"` or `"Sub Post Office"` | `"Main Post Office"` |

---

## 📊 Dataset Summary

- **Total Postal Records**: 2,111
- **Provinces (9)**: Central, Eastern, North Central, Northern, North Western, Sabaragamuwa, Southern, Uva, Western.
- **Districts (25)**: Ampara, Anuradhapura, Badulla, Batticaloa, Colombo, Galle, Gampaha, Hambantota, Jaffna, Kalutara, Kandy, Kegalle, Kilinochchi, Kurunegala, Mannar, Matale, Matara, Monaragala, Mullaitivu, Nuwara Eliya, Polonnaruwa, Puttalam, Ratnapura, Trincomalee, Vavuniya.
- **Main Post Offices**: 582
- **Sub Post Offices**: 1,529
- **Duplicate Postal Codes**: 0 (100% unique)

---

## 🧪 Testing & Verification

To run test suites:
```bash
# JavaScript tests
npm test

# Python tests
python -m unittest tests/test_py.py
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
