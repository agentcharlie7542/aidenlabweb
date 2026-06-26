import re
import os

with open('../prototype.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Fix self-closing tags for JSX (if any missed)
html = re.sub(r'<img([^>]+?)(?<!/)>', r'<img\1/>', html)
html = re.sub(r'<br([^>]*?)(?<!/)>', r'<br\1/>', html)
html = re.sub(r'<hr([^>]*?)(?<!/)>', r'<hr\1/>', html)
html = re.sub(r'<input([^>]+?)(?<!/)>', r'<input\1/>', html)
html = re.sub(r'<meta([^>]+?)(?<!/)>', r'<meta\1/>', html)

# Convert class to className
html = html.replace('class="', 'className="')
# Convert for to htmlFor
html = html.replace('for="', 'htmlFor="')
# Fix style attributes to React style objects (crude approximation for simple styles)
# style="margin-top:24px;max-width:540px" -> style={{marginTop:'24px', maxWidth:'540px'}}
def style_to_jsx(match):
    style_str = match.group(1)
    rules = style_str.split(';')
    obj_str = []
    for rule in rules:
        if ':' not in rule: continue
        key, val = rule.split(':', 1)
        key = key.strip()
        val = val.strip()
        # camelCase the key
        parts = key.split('-')
        key = parts[0] + ''.join(x.title() for x in parts[1:])
        # replace any single quotes in val to avoid syntax errors, or just use double quotes inside single quotes
        val = val.replace("'", "\\'")
        obj_str.append(f"{key}: '{val}'")
    return "style={{" + ", ".join(obj_str) + "}}"

html = re.sub(r'style="([^"]*)"', style_to_jsx, html)

# Extract mains
mains = re.findall(r'<main id="page-([^"]+)" className="page[^"]*">(.*?)</main>', html, re.DOTALL)

for page_name, content in mains:
    if page_name == 'home':
        dir_path = 'src/app'
    else:
        dir_path = f'src/app/{page_name}'
        os.makedirs(dir_path, exist_ok=True)
    
    # We should add Link to Next.js if there are a tags with data-page or internal links
    # For now just leave as <a href="...">, but ideally change to <Link>
    content = re.sub(r'<a href="([^"]+)" data-page="([^"]+)"([^>]*)>(.*?)</a>', r'<Link href="/\2"\3>\4</Link>', content, flags=re.DOTALL)
    # Replace the remaining href="#xxx" to href="/xxx" if it's an internal link
    content = content.replace('href="#contact"', 'href="/contact"')
    content = content.replace('href="#cases"', 'href="/cases"')
    content = content.replace('href="#wasabi10"', 'href="/wasabi10"')
    content = content.replace('href="#services"', 'href="/services"')

    component_code = f"""
import Link from 'next/link';

export default function {page_name.capitalize()}Page() {{
  return (
    <main className="page active">
{content}
    </main>
  );
}}
"""
    with open(f'{dir_path}/page.tsx', 'w', encoding='utf-8') as f:
        f.write(component_code)
print("Conversion done.")
