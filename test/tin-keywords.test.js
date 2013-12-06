var testutil = require('testutil')
  , fs = require('fs-extra')
  , path = require('path')
  , shell = testutil.shell

var TEST_DIR = null
var NPM_FILE = null
var COMPONENT_FILE = null
var BOWER_FILE = null
var TIN_PATH = path.join(__dirname, '../bin/tin')

describe('tin --keywords', function() {
  beforeEach(function() {
    TEST_DIR = testutil.createTestDir('tin')
    NPM_FILE = path.join(TEST_DIR, 'package.json')
    COMPONENT_FILE = path.join(TEST_DIR, 'component.json')
    BOWER_FILE = path.join(TEST_DIR, 'bower.json')

    process.chdir(TEST_DIR)
  })

  describe('> when keywords dont exist in the file yet', function() {
    it('should create the keywords field', function() {
      fs.writeJsonSync(NPM_FILE, {})
      fs.writeJsonSync(COMPONENT_FILE, {})
      fs.writeJsonSync(BOWER_FILE, {})

      var res = shell.exec(TIN_PATH + ' --check', {silent: true})
      EQ (res.code, 0)
    
      var res = shell.exec(TIN_PATH + ' --keywords "super,man"', {silent: true})

      var npm = fs.readJsonSync(NPM_FILE)
      var component = fs.readJsonSync(COMPONENT_FILE)
      var bower = fs.readJsonSync(BOWER_FILE)

      T (npm.keywords.indexOf('super') >= 0)
      T (npm.keywords.indexOf('man') >= 0)

      T (bower.keywords.indexOf('super') >= 0)
      T (bower.keywords.indexOf('man') >= 0)

      T (component.keywords.indexOf('super') >= 0)
      T (component.keywords.indexOf('man') >= 0)

    })
  })

})