tin
===

Easily manage npm package.json, component component.json, and bower bower.json files.


Why?
----

Managing Node.js and browser side JavaScript packages can be a pain in the ass. Editing multiple fields in `package.json` (Node.js/NPM), `component.json` (browser/component), and `bower.json` (browser/bower) is tedious. Tin makes this easier.



Installation
------------

    npm install -g tin



Usage
-----

Any of the three files `package.json`, `component.json`, and `bower.json` must exist. Tin will not create these files if they don't exist and they're not proper JSON.


    Usage: tin [options]

    Options:

      -h, --help                 output usage information
      -p, --path [path]          The path that contains the package files. Defaults to the current directory.
      -d, --desc [description]   Update package descriptions.
      -k, --keywords [keywords]  Add to package keywords.
      -m, --main [script]        Update main script file.
      -n, --name [name]          Update name of the packgae.
      -r, --repo [repo]          Update source repository (GitHub shorthand).
      -v, --version [version]    Update package versions.


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


