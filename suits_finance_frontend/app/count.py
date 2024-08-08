import os
import glob

banned_path = './FRONTEND/'

banned_lines_py = 1066
js_lines = 4321

def count_lines_in_python_files():
    total_lines = 0
    for filename in glob.iglob('./**/*.py', recursive=True):
        if os.path.commonpath([banned_path, filename]) == banned_path:
            continue

        with open(filename, 'r', encoding='utf8') as f:
            lines = f.readlines()
            total_lines += len(lines)
    print(f'[Python lines]: {total_lines - banned_lines_py}')
    return total_lines - banned_lines_py


def count_lines_in_rust_files():
    total_lines = 0
    for filename in glob.iglob('./**/*.rs', recursive=True):
        if os.path.commonpath([banned_path, filename]) == banned_path:
            continue

        with open(filename, 'r', encoding='utf8') as f:
            lines = f.readlines()
            total_lines += len(lines)
    print(f'[Rust lines]: {total_lines - banned_lines_py}')
    return total_lines - banned_lines_py


def count_lines_in_css_files():
    total_lines_css = 0
    for filename in glob.iglob('./**/*.css', recursive=True):
        if os.path.commonpath([banned_path, filename]) == banned_path:
            continue

        with open(filename, 'r', encoding='utf8') as f:
            lines = f.readlines()
            total_lines_css += len(lines)
    print(f'[CSS lines]: {total_lines_css}')
    return total_lines_css


def count_lines_in_jsx_files():
    total_lines_jsx = 0
    for filename in glob.iglob('./**/*.jsx', recursive=True):
        if os.path.commonpath([banned_path, filename]) == banned_path:
            continue

        with open(filename, 'r', encoding='utf8') as f:
            lines = f.readlines()
            total_lines_jsx += len(lines)
    print(f'[JSX lines]: {total_lines_jsx}')
    return total_lines_jsx


if __name__ == '__main__':
    py_lines = count_lines_in_python_files()
    total_lines_css = count_lines_in_css_files()
    jsx_lines = count_lines_in_jsx_files()
    rust_lines = count_lines_in_rust_files()
    print(f'[JS lines]: {js_lines}')
    print(f'[Total lines]: {jsx_lines + 1066 + 4321 + py_lines + total_lines_css + rust_lines}')