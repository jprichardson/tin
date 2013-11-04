var testutil = require('testutil')
  , fs = require('fs-extra')
  , path = require('path')
  , shell = testutil.shell

var TEST_DIR = null
var NPM_FILE = null
var COMPONENT_FILE = null
var BOWER_FILE = null
var TIN_PATH = path.join(__dirname, '../bin/tin')

describe('tin --check', function() {
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

      fs.writeFileSync(NPM_FILE, '{"name":"something",}') //superfluous comma

      var res = shell.exec(TIN_PATH + ' --check', {silent: true})
      EQ (res.code, 1)
      T (res.output.indexOf(NPM_FILE) >= 0)
      T (res.output.indexOf('Check failed') >= 0)
    })
  })

})