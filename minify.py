import os, shutil, jsmin, csscompressor, glob, htmlmin

# CONST
MIN_DIR = 'min'

# DEF
def minify_folder(path):
    os.mkdir(f'{MIN_DIR}\\{path}')
    for new_path in glob.glob(f'{path}\\*'):
        print(f'Working on "{new_path}"')
        if new_path.endswith('.css'):
            with open(f'{MIN_DIR}\\{new_path}', 'w+') as new_file:
                with open(new_path) as old_file:
                    content = old_file.read()
                    minified = csscompressor.compress(content)
                    new_file.write(minified)
        elif new_path.endswith('.js'):
            with open(f'{MIN_DIR}\\{new_path}', 'w+') as new_file:
                with open(new_path) as old_file:
                    content = old_file.read()
                    minified = jsmin.jsmin(content)
                    new_file.write(minified)
        else:
            minify_folder(f'{new_path}')

def copy_html(path):
    print(f'Working on "{path}"')
    with open(f'{MIN_DIR}\\{path}', 'w+') as new_file:
        with open(path) as old_file:
            content = old_file.read()
            minified = htmlmin.minify(content)
            new_file.write(minified)

# LOGIC
if os.path.exists(MIN_DIR):
    shutil.rmtree(MIN_DIR)
os.mkdir(MIN_DIR)
minify_folder('js')
minify_folder('css')
copy_html('index.html')

