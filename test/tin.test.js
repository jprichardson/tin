var testutil = require('testutil')
  , fs = require('fs-extra')
  , path = require('path')
  , shell = testutil.shell

var TEST_DIR = null
var NPM_FILE = null
var COMPONENT_FILE = null
var BOWER_FILE = null
var TIN_PATH = path.join(__dirname, '../bin/tin')

describe('tin', function() {
  beforeEach(function() {
    TEST_DIR = testutil.createTestDir('tin')
    NPM_FILE = path.join(TEST_DIR, 'package.json')
    COMPONENT_FILE = path.join(TEST_DIR, 'component.json')
    BOWER_FILE = path.join(TEST_DIR, 'bower.json')

    fs.writeJsonSync(NPM_FILE, {})
    fs.writeJsonSync(COMPONENT_FILE, {})
    fs.writeJsonSync(BOWER_FILE, {})
    process.chdir(TEST_DIR) 
  })

  describe('arg: main', function() {
    it('should create the main field', function() {
      var fieldVal = "lib/awesome.json"
      shell.exec(TIN_PATH + ' --main ' + fieldVal, {silent: true})
    
      EQ (fs.readJsonSync(NPM_FILE).main, fieldVal)
      EQ (fs.readJsonSync(BOWER_FILE).main, fieldVal)
      T (fs.readJsonSync(COMPONENT_FILE).scripts.indexOf(fieldVal) >= 0)
      EQ (fs.readJsonSync(COMPONENT_FILE).main, fieldVal)
    })
  })
  describe('arg: version', function() {
    it('should create the main field', function() {
      var fieldVal = "1.0.3"
      shell.exec(TIN_PATH + ' -v ' + fieldVal, {silent: true})
    
      EQ (fs.readJsonSync(NPM_FILE).version, fieldVal)
      EQ (fs.readJsonSync(BOWER_FILE).version, fieldVal)
      EQ (fs.readJsonSync(COMPONENT_FILE).version, fieldVal)
    })
  })
})