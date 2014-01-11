tin
===

Easily manage NPM, component, and bower package files.


Why?
----

Managing Node.js and browser side JavaScript packages can be a pain in the ass. Editing multiple fields in `package.json` (Node.js/NPM), `component.json` (browser/component), and `bower.json` (browser/bower) is tedious. Tin makes this easier.



Installation
------------

    npm install -g tin



Specs
-----

- **component**: https://github.com/component/component/wiki/Spec
- **npm**: https://npmjs.org/doc/json.html
- **bower**: https://docs.google.com/document/d/1APq7oA9tNao1UYWyOm8dKqlRP2blVkROYLZ2fLIjtWc/edit (not sure if this is the most to date one)


Usage
-----

Any of the three files `package.json`, `component.json`, and `bower.json` must exist. Tin will not create these files if they don't exist and they're not proper JSON.


    Usage: tin [options]

    Options:

    -h, --help                                    output usage information
    -p, --path [path]                             The path that contains the package files. Defaults to the current directory.
    --create                                      If any of the files don't exist, it creates them.
    --check                                       Check to verify files are valid. Don't use in conjunction with any other options.
    -d, --desc [description]                      Update package descriptions.
    -k, --keywords [keywords]                     Add to package keywords.
    -m, --main [script]                           Update main script file.
    -n, --name [name]                             Update name of the package.
    -r, --repo [repo]                             Update source repository (GitHub shorthand).
    -v, --version [version]                       Update package versions.
    -b, --bump [major, minor, patch, prerelease]  Bump package version by increment



### create

creates any of the package files if they don't exist:

    tin --create

also, if any of the files do exist, it won't overwrite them, can pass other params too:

    tin --create -name awesome


### check

checks to make sure that the files are JSON parsable, don't use this in conjunction with any other args

    tin --check



### version

update the packages version:

    tin -v 0.0.1


### description

update package description: 

    tin -d "Super cool JavaScript module."


### keywords

clear keywords:

    tin -k

or

    tin -k ""

add to the keywords:

    tin -k "file, tcp, processing"


### main script

    tin -m "lib/awesome-module.js"


### name

    tin -n "awesome-module"


### repo
  
    tin -r "jprichardson/awesome-module"


### version

    tin -v "0.0.1"

(running `tin -v` without a parameter, like `tin -v` results in displaying the current `Tin` version)



License
-------

(MIT License)

Copyright 2013, JP Richardson  <jprichardson@gmail.com>


