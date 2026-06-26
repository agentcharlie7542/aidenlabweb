import re
import os
import glob

# Add Footer to layout.tsx
layout_path = 'src/app/layout.tsx'
with open(layout_path, 'r', encoding='utf-8') as f:
    layout_content = f.read()

if 'import Footer' not in layout_content:
    layout_content = layout_content.replace(
        "import SitemapPanel from '@/components/layout/SitemapPanel';",
        "import SitemapPanel from '@/components/layout/SitemapPanel';\nimport Footer from '@/components/layout/Footer';"
    )
    layout_content = layout_content.replace(
        "<SitemapPanel />",
        "<Footer />\n        <SitemapPanel />"
    )
    with open(layout_path, 'w', encoding='utf-8') as f:
        f.write(layout_content)

# Remove footers from pages
for filepath in glob.glob("src/app/**/page.tsx", recursive=True):
    # skip studio
    if 'studio' in filepath: continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Non-greedy match for footer tag
    content = re.sub(r'<footer>.*?</footer>', '', content, flags=re.DOTALL)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Footer removed from pages and added to layout.")
