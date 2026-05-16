import os
import re

# Define the directory to search
directory = '/Users/tronix/Desktop/servicebook/client/src'

# Define the spacing tokens to prefix
tokens = ['xs', 'sm', 'base', 'md', 'lg', 'xl', '2xl']

# Define the Tailwind utility prefixes that use spacing tokens
prefixes = [
    'p', 'm', 'gap', 'w', 'h', 
    'mb', 'mt', 'ml', 'mr', 
    'px', 'py', 'mx', 'my', 
    'pb', 'pt', 'pl', 'pr', 
    'inset', 'top', 'bottom', 'left', 'right',
    'space-x', 'space-y'
]

# Create the regex pattern
# It matches a prefix followed by a hyphen and one of the tokens
pattern = r'(?<![\w-])(' + '|'.join(prefixes) + r')-(' + '|'.join(tokens) + r')(?![-\w])'

def replace_spacing(match):
    prefix = match.group(1)
    token = match.group(2)
    return f"{prefix}-m3-{token}"

# Walk through the directory and replace in files
for root, dirs, files in os.walk(directory):
    for file in files:
        if file.endswith(('.jsx', '.js', '.tsx', '.ts', '.html', '.css')):
            filepath = os.path.join(root, file)
            with open(filepath, 'r') as f:
                content = f.read()
            
            new_content = re.sub(pattern, replace_spacing, content)
            
            if new_content != content:
                with open(filepath, 'w') as f:
                    f.write(new_content)
                print(f"Updated {filepath}")
