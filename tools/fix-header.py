import re

f = '/home/hostingoceanuk/public_html/whmcs/templates/twenty-one/header.tpl'
with open(f) as fh:
    content = fh.read()

# Remove any broken injection we may have added
content = re.sub(r'\n    <link rel=.*?hostingocean-brand[^>]*>', '', content)

# Add clean link after {$headoutput}
link = '\n    <link rel="stylesheet" href="/whmcs/templates/twenty-one/css/hostingocean-brand.css">'

if 'hostingocean-brand.css' not in content:
    content = content.replace('    {$headoutput}', '    {$headoutput}' + link)

with open(f, 'w') as fh:
    fh.write(content)

print('done')
