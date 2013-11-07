var testutil = require('testutil')
  , fs = require('fs-extra')
  , path = require('path')
  , shell = testutil.shell

var TEST_DIR = null
var NPM_FILE = null
var COMPONENT_FILE = null
var BOWER_FILE = null
var TIN_PATH = path.join(__dirname, '../bin/tin')

describe('tin --repo', function() {
  beforeEach(function() {
    TEST_DIR = testutil.createTestDir('tin')
    NPM_FILE = path.join(TEST_DIR, 'package.json')
    COMPONENT_FILE = path.join(TEST_DIR, 'component.json')
    BOWER_FILE = path.join(TEST_DIR, 'bower.json')

    process.chdir(TEST_DIR)

    F (fs.existsSync(NPM_FILE))
    F (fs.existsSync(COMPONENT_FILE))
    F (fs.existsSync(BOWER_FILE))

    var res = shell.exec(TIN_PATH + ' --create', {silent: true})

    T (fs.existsSync(NPM_FILE))
    T (fs.existsSync(COMPONENT_FILE))
    T (fs.existsSync(BOWER_FILE))
  })

  describe('> when the repo is github', function() {
    it('should chop the url for component', function() {
      var repo = "https://github.com/jprichardson/super-widget"
      var res = shell.exec(TIN_PATH + ' --repo ' + repo, {silent: true})
      EQ (res.code, 0)

      var npm = fs.readJsonSync(NPM_FILE)
      var bower = fs.readJsonSync(BOWER_FILE)
      var component = fs.readJsonSync(COMPONENT_FILE)

      EQ (npm.repository.url, repo)
      EQ (bower.repo, repo)
      EQ (component.repo, 'jprichardson/super-widget')
    })
  })

  describe('> when the repo is github and contains the suffix .git', function() {
    it('should chop the url for component', function() {
      var repo = "https://github.com/jprichardson/super-widget.git"
      var res = shell.exec(TIN_PATH + ' --repo ' + repo, {silent: true})
      console.log(res.output)
      EQ (res.code, 0)

      var npm = fs.readJsonSync(NPM_FILE)
      var bower = fs.readJsonSync(BOWER_FILE)
      var component = fs.readJsonSync(COMPONENT_FILE)

      EQ (npm.repository.url, repo)
      EQ (bower.repo, repo)
      EQ (component.repo, 'jprichardson/super-widget')
    })
  })

})