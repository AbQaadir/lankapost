# 🇱🇰 lankapost - Sri Lanka Postal Codes & Zip Codes Dataset

[![npm version](https://img.shields.io/npm/v/lankapost.svg?color=blue)](https://www.npmjs.com/package/lankapost)
[![PyPI version](https://img.shields.io/pypi/v/lankapost.svg?color=green)](https://pypi.org/project/lankapost/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Records Count](https://img.shields.io/badge/Records-2%2C111%20Cleaned-brightgreen.svg)]()
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-0-orange.svg)]()
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

**`lankapost`** is the ultimate, zero-dependency, open-source dataset and lookup utility for **Sri Lanka Postal Codes (Zip Codes / Pin Codes)**, post offices, sub-post offices, districts, and provinces.

Optimized for **E-commerce checkout forms**, **address validation**, **logistics & courier routing**, **mobile apps (Flutter/React Native)**, **Node.js/TypeScript**, and **Python applications**.

---

## ⚡ Quick Reference: Colombo Zones & Major Cities

Sri Lanka uses a **5-digit postal code system**. Colombo postal zones are numbered from **Colombo 01 (`00100`) to Colombo 15 (`01500`)**.

### 🏙️ Colombo Postal Zones (Colombo 1 - 15)

| Zone | Area / Location | Postal Code | District | Province |
| :--- | :--- | :--- | :--- | :--- |
| **Colombo 01** | Fort | `00100` | Colombo | Western Province |
| **Colombo 02** | Slave Island / Union Place | `00200` | Colombo | Western Province |
| **Colombo 03** | Kollupitiya (Colpetty) | `00300` | Colombo | Western Province |
| **Colombo 04** | Bambalapitiya | `00400` | Colombo | Western Province |
| **Colombo 05** | Havelock Town / Kirulapone North | `00500` | Colombo | Western Province |
| **Colombo 06** | Wellawatte / Pamankada | `00600` | Colombo | Western Province |
| **Colombo 07** | Cinnamon Gardens | `00700` | Colombo | Western Province |
| **Colombo 08** | Borella | `00800` | Colombo | Western Province |
| **Colombo 09** | Dematagoda | `00900` | Colombo | Western Province |
| **Colombo 10** | Maradana / Panchikawatte | `01000` | Colombo | Western Province |
| **Colombo 11** | Pettah | `01100` | Colombo | Western Province |
| **Colombo 12** | Hultsdorf / Aluthkade | `01200` | Colombo | Western Province |
| **Colombo 13** | Kotahena / Bloemendhal | `01300` | Colombo | Western Province |
| **Colombo 14** | Grandpass | `01400` | Colombo | Western Province |
| **Colombo 15** | Mutwal / Modara / Mattakkuliya | `01500` | Colombo | Western Province |

---

### 📍 Popular Commercial Hubs & Key Cities Across Sri Lanka

| City / Town | Postal Code | District | Province |
| :--- | :--- | :--- | :--- |
| **Dehiwala** | `10350` | Colombo | Western Province |
| **Mount Lavinia** | `10370` | Colombo | Western Province |
| **Moratuwa** | `10400` | Colombo | Western Province |
| **Nugegoda** | `10250` | Colombo | Western Province |
| **Maharagama** | `10280` | Colombo | Western Province |
| **Battaramulla** | `10120` | Colombo | Western Province |
| **Kaduwela** | `10640` | Colombo | Western Province |
| **Sri Jayawardenepura Kotte** | `10100` | Colombo | Western Province |
| **Negombo** | `11500` | Gampaha | Western Province |
| **Gampaha** | `11000` | Gampaha | Western Province |
| **Wattala** | `11300` | Gampaha | Western Province |
| **Kelaniya** | `11600` | Gampaha | Western Province |
| **Kandy** | `20000` | Kandy | Central Province |
| **Peradeniya** | `20400` | Kandy | Central Province |
| **Akurana** | `20850` | Kandy | Central Province |
| **Galle** | `80000` | Galle | Southern Province |
| **Matara** | `81000` | Matara | Southern Province |
| **Jaffna** | `40000` | Jaffna | Northern Province |
| **Kurunegala** | `60000` | Kurunegala | North Western Province |
| **Anuradhapura** | `50000` | Anuradhapura | North Central Province |
| **Ratnapura** | `70000` | Ratnapura | Sabaragamuwa Province |
| **Badulla** | `90000` | Badulla | Uva Province |
| **Nuwara Eliya** | `22200` | Nuwara Eliya | Central Province |
| **Trincomalee** | `31000` | Trincomalee | Eastern Province |
| **Batticaloa** | `30000` | Batticaloa | Eastern Province |

---

## 🌐 Instant CDN & REST API Access (No Install Needed)

Load the complete Sri Lanka postal code dataset directly in browsers, Jamstack sites, or mobile apps over global edge CDNs:

- **Full JSON Dataset (2,111 records)**:  
  `https://cdn.jsdelivr.net/gh/AbQaadir/lankapost@main/data/postal_codes.json`
- **CSV Format (for Excel / Pandas / Data Science)**:  
  `https://cdn.jsdelivr.net/gh/AbQaadir/lankapost@main/data/postal_codes.csv`

### Direct Fetch Example (JavaScript / Fetch API)
```javascript
// Fetch directly via CDN
const res = await fetch('https://cdn.jsdelivr.net/gh/AbQaadir/lankapost@main/data/postal_codes.json');
const postalCodes = await res.json();

// Find postal code for Akurana
const akurana = postalCodes.find(p => p.postal_code === '20850');
console.log(akurana.place_name); // 'Akurana'
```

### Dart / Flutter Example
```dart
import 'dart:convert';
import 'package:http/http.dart' as http;

Future<List<dynamic>> fetchSriLankaPostalCodes() async {
  final url = Uri.parse('https://cdn.jsdelivr.net/gh/AbQaadir/lankapost@main/data/postal_codes.json');
  final response = await http.get(url);
  if (response.statusCode == 200) {
    return jsonDecode(response.body);
  }
  throw Exception('Failed to load postal codes');
}
```

---

## 📦 JavaScript / TypeScript (Node.js & NPM)

### Installation
```bash
npm install lankapost
# or
yarn add lankapost
# or
pnpm add lankapost
```

### ESM & TypeScript
```typescript
import {
  getByPostalCode,
  search,
  getByDistrict,
  getByProvince,
  getAll,
  getDistricts,
  getProvinces,
  getGrouped
} from 'lankapost';

// 1. Instant O(1) Lookup by 5-digit code
const office = getByPostalCode('20850');
console.log(office);
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

// 2. Real-time Search / Autocomplete (Supports place names, codes, districts)
const results = search('colombo', { limit: 5 });

// 3. Filter by District (by name or 2-letter abbreviation)
const kandyOffices = getByDistrict('Kandy'); // or getByDistrict('KY')

// 4. Filter by Province
const southernOffices = getByProvince('Southern Province');

// 5. Get List of all 25 Districts or 9 Provinces
const districts = getDistricts();
const provinces = getProvinces();

// 6. Dynamic Grouped Hierarchy
const hierarchy = getGrouped();
console.log(hierarchy['Western Province']['Colombo']);
```

### CommonJS (Node.js)
```javascript
const { getByPostalCode, search, getByDistrict } = require('lankapost');

const office = getByPostalCode('00300'); // Kollupitiya, Colombo
```

---

## 🐍 Python (PyPI)

### Installation
```bash
pip install lankapost
```

### Usage
```python
import lankapost
from lankapost import (
    get_by_postal_code,
    search,
    get_by_district,
    get_by_province,
    get_all,
    get_districts,
    get_provinces,
    get_grouped,
)

# 1. Instant Lookup
office = get_by_postal_code("00100")
print(office)
# {'postal_code': '00100', 'place_name': 'Colombo 01', 'district_code': 'CO',
#  'district_name': 'Colombo', 'province': 'Western Province', 'post_office_type': 'Main Post Office'}

# 2. Case-insensitive Search with Filters
results = search("galle", limit=5, province="Southern Province")

# 3. Filter by District
kandy_offices = get_by_district("Kandy")  # or get_by_district("KY")

# 4. Grouped Tree Data
tree = get_grouped()
print(tree["Western Province"]["Colombo"])
```

---

## 📋 Data Schema

Each postal record follows this standard JSON structure:

```json
{
  "postal_code": "20850",
  "place_name": "Akurana",
  "district_code": "KY",
  "district_name": "Kandy",
  "province": "Central Province",
  "post_office_type": "Main Post Office"
}
```

| Field | Type | Description | Example |
| :--- | :--- | :--- | :--- |
| `postal_code` | `string` | Official 5-digit postal code | `"20850"`, `"00100"` |
| `place_name` | `string` | Standardized place / town name | `"Akurana"`, `"Kollupitiya"` |
| `district_code` | `string` | 2-3 letter district abbreviation | `"KY"`, `"CO"`, `"GL"` |
| `district_name` | `string` | Administrative district name | `"Kandy"`, `"Colombo"` |
| `province` | `string` | Administrative province name | `"Central Province"` |
| `post_office_type` | `string` | `"Main Post Office"` or `"Sub Post Office"` | `"Main Post Office"` |

---

## 📊 Dataset Statistics

- **Total Postal Records**: 2,111
- **Administrative Provinces (9)**: Central, Eastern, North Central, Northern, North Western, Sabaragamuwa, Southern, Uva, Western.
- **Administrative Districts (25)**: Ampara, Anuradhapura, Badulla, Batticaloa, Colombo, Galle, Gampaha, Hambantota, Jaffna, Kalutara, Kandy, Kegalle, Kilinochchi, Kurunegala, Mannar, Matale, Matara, Monaragala, Mullaitivu, Nuwara Eliya, Polonnaruwa, Puttalam, Ratnapura, Trincomalee, Vavuniya.
- **Main Post Offices**: 582
- **Sub Post Offices**: 1,529
- **Duplicate Records**: 0 (100% unique postal codes)

---

## ❓ Frequently Asked Questions (FAQ)

### What format do Sri Lanka postal codes use?
Sri Lanka postal codes are **5-digit numeric strings** (e.g., `00100` for Colombo 01, `20000` for Kandy). Because leading zeros are meaningful (e.g. `00100` to `01500`), postal codes should always be handled as strings rather than integers.

### How are Colombo postal zones numbered?
Colombo is divided into 15 zones numbered from Colombo 01 (`00100`) to Colombo 15 (`01500`). For example, Fort is `00100`, Kollupitiya is `00300`, Bambalapitiya is `00400`, and Wellawatte is `00600`.

### Can I use `lankapost` for e-commerce checkout & delivery calculation?
Yes! `lankapost` is zero-dependency and operates entirely in memory, making it ideal for instant address autocomplete, zip code verification, and courier/delivery fee calculation based on district or province.

### How can I report an inaccurate postal code or a missing area?
Please check out [CONTRIBUTING.md](CONTRIBUTING.md) or open an issue on our [GitHub Issue Tracker](https://github.com/AbQaadir/lankapost/issues).

---

## 🧪 Testing

```bash
# Run JavaScript test suite
npm test

# Run Python test suite
python -m unittest tests/test_py.py
```

---

## 📄 License

This project is open source and released under the [MIT License](LICENSE).
