# -*- coding: utf-8 -*-
import os
import sys
import html

try:
    import openpyxl
except ImportError:
    print("ERROR: install openpyxl: pip install openpyxl", file=sys.stderr)
    sys.exit(1)

base = os.path.dirname(os.path.abspath(__file__))
path = os.path.join(base, "assets", "okr", "OKR_Levshanova.xlsx")
if not os.path.isfile(path):
    print("ERROR: file not found " + path, file=sys.stderr)
    sys.exit(1)

wb = openpyxl.load_workbook(path, data_only=True)
ws = wb.active
rows = []
for row in ws.iter_rows(values_only=True):
    cells = [str(c).strip() if c is not None else "" for c in row]
    if any(cells):
        rows.append(cells)

# Use only first 6 columns (main content; xlsx has many empty columns)
max_cols = 6
out = []
out.append('<div class="okr-table-wrap"><table class="okr-table">')
for i, row in enumerate(rows):
    tag = "th" if i == 0 else "td"
    out.append("<tr>")
    for j, cell in enumerate(row):
        if j >= max_cols:
            break
        esc = html.escape(cell)
        if not esc and i > 0:
            esc = "—"
        out.append("<" + tag + ">" + esc + "</" + tag + ">")
    out.append("</tr>")
out.append("</table></div>")

out_path = os.path.join(base, "okr_levshanova_table.html")
with open(out_path, "w", encoding="utf-8") as f:
    f.write("\n".join(out))
print("OK written to", out_path)
