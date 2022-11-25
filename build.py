# This scripts packs Extension according to the supplied browser arguments

import os, sys, shutil
browser = sys.argv[1]


# Color constants
CGREEN = '\33[32m'
CEND = '\33[0m'

# Vars
build_path = '/dist'
cwd = os.getcwd()
ext_directory = os.path.join(cwd, 'extensions')

def pack_extension(source):
    jsonFile = cwd + '/manifest/' + browser +'.json'
    if not os.path.exists(source):
        print('❌ Error building package please make sure you have already run the build command')
        return False
    
    if not os.path.exists(jsonFile):
        print('❌ \033[1m '+ browser +'.json\033[0m file does not exist')
        return False
    

    if (browser):
        shutil.copy(jsonFile, cwd + build_path + '/manifest.json')
    else:
        print('❌ Please specify browser argument')
        return False
    
    if not os.path.exists(ext_directory):
        os.makedirs(ext_directory)
    shutil.make_archive(os.path.join(cwd,'extensions', browser), 'zip', source)
    print(CGREEN +'✅ Extension archive: \033[1m ' + browser + '.zip\033[0m '+ CGREEN +'created at '+ ext_directory + CEND)

if __name__ == '__main__':
    pack_extension( cwd + build_path)