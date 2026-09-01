import unittest
from lankapost import (
    get_all,
    get_by_postal_code,
    search,
    get_by_district,
    get_by_province,
    get_districts,
    get_provinces,
    get_grouped,
)


class TestLankaPost(unittest.TestCase):
    def test_get_all(self):
        all_records = get_all()
        self.assertEqual(len(all_records), 2111)

    def test_get_by_postal_code(self):
        record = get_by_postal_code("20850")
        self.assertIsNotNone(record)
        self.assertEqual(record["place_name"], "Akurana")
        self.assertEqual(record["district_name"], "Kandy")
        self.assertEqual(record["district_code"], "KY")
        self.assertEqual(record["province"], "Central Province")
        self.assertEqual(record["post_office_type"], "Main Post Office")

    def test_integer_code_lookup(self):
        record = get_by_postal_code(20850)
        self.assertIsNotNone(record)
        self.assertEqual(record["place_name"], "Akurana")

    def test_typo_fix_mulkiriyawa(self):
        record = get_by_postal_code("50324")
        self.assertIsNotNone(record)
        self.assertEqual(record["place_name"], "Mulkiriyawa")
        self.assertEqual(record["district_name"], "Anuradhapura")
        self.assertEqual(record["post_office_type"], "Sub Post Office")

    def test_devinuwara_no_alt_name(self):
        record = get_by_postal_code("81160")
        self.assertIsNotNone(record)
        self.assertEqual(record["place_name"], "Devinuwara")
        self.assertNotIn("alt_name", record)

    def test_get_by_district(self):
        kandy_by_name = get_by_district("Kandy")
        kandy_by_code = get_by_district("KY")
        self.assertEqual(len(kandy_by_name), 179)
        self.assertEqual(len(kandy_by_code), 179)

    def test_get_by_province(self):
        wp = get_by_province("Western Province")
        self.assertEqual(len(wp), 279)

    def test_search(self):
        res = search("kandy")
        self.assertGreater(len(res), 0)

        res_limit = search("a", limit=5)
        self.assertEqual(len(res_limit), 5)

        res_filtered = search("galle", province="Southern Province")
        self.assertTrue(all(r["province"] == "Southern Province" for r in res_filtered))

    def test_districts_and_provinces(self):
        districts = get_districts()
        provinces = get_provinces()
        self.assertEqual(len(districts), 25)
        self.assertEqual(len(provinces), 9)

    def test_get_grouped(self):
        grouped = get_grouped()
        self.assertEqual(len(grouped), 9)
        self.assertIn("Western Province", grouped)
        self.assertIn("Colombo", grouped["Western Province"])


if __name__ == "__main__":
    unittest.main()
