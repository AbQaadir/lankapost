# Contributing to lankapost

Thank you for your interest in contributing to **`lankapost`**! We welcome community contributions to keep Sri Lanka's postal code dataset up to date, accurate, and developer-friendly.

---

## 🛠️ Ways to Contribute

1. **Report Corrections / Missing Codes**:
   - If a new post office was opened, a postal code changed, or you found a typo in a place name, please [open an issue](https://github.com/AbQaadir/lankapost/issues) or submit a Pull Request modifying `data/postal_codes.json`.
2. **Feature Requests & Code Improvements**:
   - Improvements to search performance, helper functions, or new language bindings (e.g., Go, Rust, Dart).

---

## 🧪 Development Workflow

### 1. Fork & Clone
```bash
git clone https://github.com/<your-username>/lankapost.git
cd lankapost
```

### 2. Node.js Environment
```bash
npm install
npm test
```

### 3. Python Environment
```bash
uv venv
source .venv/bin/activate  # or .\.venv\Scripts\Activate.ps1 on Windows
uv pip install build hatchling
python -m unittest tests/test_py.py
```

---

## 📋 Data Guidelines

If you are updating `data/postal_codes.json`:
- Ensure `postal_code` is a 5-digit string (e.g., `"20850"`).
- Maintain proper capitalization for `place_name`, `district_name`, and `province`.
- Run tests (`npm test` and `python -m unittest tests/test_py.py`) before submitting your PR to ensure data validity.

---

## 📄 License
By contributing to `lankapost`, you agree that your contributions will be licensed under the project's [MIT License](LICENSE).
