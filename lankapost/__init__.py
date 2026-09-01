"""
Sri Lanka Postal Codes - Official postal codes, post offices, districts, and provinces dataset.
Zero runtime dependencies. Fast in-memory search and lookup.
"""

from __future__ import annotations
import json
import os
from pathlib import Path
from typing import Any, Dict, List, Optional, Union

__version__ = "1.0.1"
__all__ = [
    "getAll",
    "getByPostalCode",
    "search",
    "getByDistrict",
    "getByProvince",
    "getDistricts",
    "getProvinces",
    "getGrouped",
    "get_all",
    "get_by_postal_code",
    "get_by_district",
    "get_by_province",
    "get_districts",
    "get_provinces",
    "get_grouped",
]

_CURRENT_DIR = Path(__file__).resolve().parent

# Check for package-bundled data or workspace root data
_DATA_PATH = _CURRENT_DIR / "data" / "postal_codes.json"
if not _DATA_PATH.exists():
    _DATA_PATH = _CURRENT_DIR.parent / "data" / "postal_codes.json"

with open(_DATA_PATH, "r", encoding="utf-8") as _f:
    _RAW_DATA: List[Dict[str, Any]] = json.load(_f)

# Build index maps for fast O(1) lookups
_CODE_MAP: Dict[str, Dict[str, Any]] = {}
_DISTRICT_MAP: Dict[str, List[Dict[str, Any]]] = {}
_PROVINCE_MAP: Dict[str, List[Dict[str, Any]]] = {}

for _item in _RAW_DATA:
    _CODE_MAP[_item["postal_code"]] = _item

    _d_key = _item["district_name"].lower()
    _d_code_key = _item["district_code"].lower()

    if _d_key not in _DISTRICT_MAP:
        _DISTRICT_MAP[_d_key] = []
    if _d_code_key not in _DISTRICT_MAP:
        _DISTRICT_MAP[_d_code_key] = []

    _DISTRICT_MAP[_d_key].append(_item)
    if _d_code_key != _d_key:
        _DISTRICT_MAP[_d_code_key].append(_item)

    _p_key = _item["province"].lower()
    if _p_key not in _PROVINCE_MAP:
        _PROVINCE_MAP[_p_key] = []
    _PROVINCE_MAP[_p_key].append(_item)

_DISTRICT_LIST: List[str] = sorted(list(set(r["district_name"] for r in _RAW_DATA)))
_PROVINCE_LIST: List[str] = sorted(list(set(r["province"] for r in _RAW_DATA)))


def get_all() -> List[Dict[str, Any]]:
    """Returns a list of all 2,111 Sri Lankan postal records."""
    return _RAW_DATA


def get_by_postal_code(code: Union[str, int]) -> Optional[Dict[str, Any]]:
    """
    Looks up a postal record by its 5-digit postal code.
    Example: get_by_postal_code('20850') or get_by_postal_code(20850)
    """
    if code is None:
        return None
    str_code = str(code).strip().zfill(5)
    return _CODE_MAP.get(str_code)


def search(
    query: str,
    limit: Optional[int] = None,
    district: Optional[str] = None,
    province: Optional[str] = None,
) -> List[Dict[str, Any]]:
    """
    Searches postal records by place name, postal code, or district name.
    Matches case-insensitively with optional district and province filters.
    """
    if not query or not isinstance(query, str):
        return []

    q = query.strip().lower()
    if not q:
        return []

    filter_district = district.strip().lower() if district else None
    filter_province = province.strip().lower() if province else None

    results: List[Dict[str, Any]] = []
    for item in _RAW_DATA:
        if filter_district:
            if (
                item["district_name"].lower() != filter_district
                and item["district_code"].lower() != filter_district
            ):
                continue

        if filter_province:
            if item["province"].lower() != filter_province:
                continue

        if (
            q in item["place_name"].lower()
            or q in item["postal_code"]
            or q in item["district_name"].lower()
        ):
            results.append(item)
            if limit and len(results) >= limit:
                break

    return results


def get_by_district(district: str) -> List[Dict[str, Any]]:
    """
    Returns all postal records in a given district (e.g. 'Kandy', 'KY', 'Colombo').
    """
    if not district or not isinstance(district, str):
        return []
    return _DISTRICT_MAP.get(district.strip().lower(), [])


def get_by_province(province: str) -> List[Dict[str, Any]]:
    """
    Returns all postal records in a given province (e.g. 'Central Province', 'Western Province').
    """
    if not province or not isinstance(province, str):
        return []
    return _PROVINCE_MAP.get(province.strip().lower(), [])


def get_districts() -> List[str]:
    """Returns a list of all 25 Sri Lankan administrative districts."""
    return _DISTRICT_LIST


def get_provinces() -> List[str]:
    """Returns a list of all 9 Sri Lankan provinces."""
    return _PROVINCE_LIST


_grouped_data_cache: Optional[Dict[str, Any]] = None

def get_grouped() -> Dict[str, Any]:
    """Returns hierarchical dataset grouped by Province and District."""
    global _grouped_data_cache
    if _grouped_data_cache is not None:
        return _grouped_data_cache

    grouped = {}
    for item in _RAW_DATA:
        prov = item["province"]
        dist = item["district_name"]
        if prov not in grouped:
            grouped[prov] = {}
        if dist not in grouped[prov]:
            grouped[prov][dist] = []
        grouped[prov][dist].append(item)
    
    _grouped_data_cache = grouped
    return _grouped_data_cache


# CamelCase aliases for cross-language consistency
getAll = get_all
getByPostalCode = get_by_postal_code
getByDistrict = get_by_district
getByProvince = get_by_province
getDistricts = get_districts
getProvinces = get_provinces
getGrouped = get_grouped
