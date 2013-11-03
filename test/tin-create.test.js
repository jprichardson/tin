var testutil = require('testutil')
  , fs = require('fs-extra')
  , path = require('path')
  , shell = testutil.shell

var TEST_DIR = null
var NPM_FILE = null
var COMPONENT_FILE = null
var BOWER_FILE = null
var TIN_PATH = path.join(__dirname, '../bin/tin')

describe('tin --create', function() {
  beforeEach(function() {
    TEST_DIR = testutil.createTestDir('tin')
    NPM_FILE = path.join(TEST_DIR, 'package.json')
    COMPONENT_FILE = path.join(TEST_DIR, 'component.json')
    BOWER_FILE = path.join(TEST_DIR, 'bower.json')

    process.chdir(TEST_DIR)
  })

  describe('> when any of the three files dont exist', function() {
    it('should create the files', function() {
      F (fs.existsSync(NPM_FILE))
      F (fs.existsSync(COMPONENT_FILE))
      F (fs.existsSync(BOWER_FILE))

      shell.exec(TIN_PATH + ' --create', {silent: true})

      T (fs.existsSync(NPM_FILE))
      T (fs.existsSync(COMPONENT_FILE))
      T (fs.existsSync(BOWER_FILE))

      //if these files aren't json, an exception would be thrown
      fs.readJsonSync(NPM_FILE)
      fs.readJsonSync(COMPONENT_FILE)
      fs.readJsonSync(BOWER_FILE)
    })
  })

  describe('> when one of the files does exist', function() {
    it('should create the others and not overwrite the one that does exist', function() {
      F (fs.existsSync(NPM_FILE))
      F (fs.existsSync(COMPONENT_FILE))
      F (fs.existsSync(BOWER_FILE))

      fs.writeFileSync(NPM_FILE, '{"name": "cool-mod"}')

      shell.exec(TIN_PATH + ' --create', {silent: true})

      T (fs.existsSync(NPM_FILE))
      T (fs.existsSync(COMPONENT_FILE))
      T (fs.existsSync(BOWER_FILE))

      //if these files aren't json, an exception would be thrown
      fs.readJsonSync(COMPONENT_FILE)
      fs.readJsonSync(BOWER_FILE)

      //verify wasn't overwritten
      var npm = fs.readJsonSync(NPM_FILE)
      EQ (npm.name, 'cool-mod')
    })
  })

  describe('> when another parameter is passed', function() {
    it('should create the files that dont exist and set the parameters in all', function() {
      F (fs.existsSync(NPM_FILE))
      F (fs.existsSync(COMPONENT_FILE))
      F (fs.existsSync(BOWER_FILE))

      fs.writeFileSync(NPM_FILE, '{"name": "cool-mod", "description":"a cool module"}')

      shell.exec(TIN_PATH + ' --create --name crazy', {silent: true})

      T (fs.existsSync(NPM_FILE))
      T (fs.existsSync(COMPONENT_FILE))
      T (fs.existsSync(BOWER_FILE))

      var npm = fs.readJsonSync(NPM_FILE)
      var component = fs.readJsonSync(COMPONENT_FILE)
      var bower = fs.readJsonSync(BOWER_FILE)
      
      EQ (npm.name, 'crazy')
      EQ (component.name, 'crazy')
      EQ (bower.name, 'crazy')

      //verify wasn't overwritten
      EQ (npm.description, "a cool module")
    })
  })
})