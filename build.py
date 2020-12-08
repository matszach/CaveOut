import os, shutil, jsmin, csscompressor, glob, htmlmin, dukpy

# CONST
MIN_DIR = 'out\\min'

# DEF
def minify_folder(path):
    os.mkdir(f'{MIN_DIR}\\{path}')
    for new_path in glob.glob(f'src\\{path}\\*'):
        print(f'Working on "{new_path}"')
        min_path = f'{MIN_DIR}\\{new_path[4:]}'
        if new_path.endswith('.css'):
            with open(min_path, 'w+') as new_file:
                with open(new_path) as old_file:
                    content = old_file.read()
                    content = csscompressor.compress(content)
                    new_file.write(content)
        elif new_path.endswith('.js'):
            with open(min_path, 'w+') as new_file:
                with open(new_path) as old_file:
                    content = old_file.read()
                    content = jsmin.jsmin(content)
                    new_file.write(content)
        else:
            minify_folder(f'{new_path[4:]}')

def copy_html(path):
    print(f'Working on "{path}"')
    with open(f'{MIN_DIR}\\{path}', 'w+') as new_file:
        with open('src\\' + path) as old_file:
            content = old_file.read()
            minified = htmlmin.minify(content)
            new_file.write(minified)

# LOGIC
if os.path.exists('out'):
    shutil.rmtree('out')
os.system('tsc')
os.system('mkdir out\\compiled\\css')
os.system(f'xcopy src\\css out\\compiled\\css /e /h /c /i')
os.system(f'copy src\\index.html out\\compiled\\index.html')
os.system('tsc')
os.mkdir(MIN_DIR)
minify_folder('js')
minify_folder('css')
copy_html('index.html')

