module.exports = function(packageName, deps, devDeps, scripts, misc, conf) {
  var result = {};

  result.name = packageName;
  result.version = '0.0.0';
  result.description = 'INSERT_DESCRIPTION';
  result.main = misc.main || 'index.js';
  result.bin = misc.bin || void 0;
  result.scripts = scripts || {
    test: 'echo \"Error: no test specified\" && exit 1'
  };
  result.preferGlobal = misc.preferGlobal || 'false',
  result.repository = {
    type: 'git',
    url: 'git+https://github.com/ewnd9/' + packageName + '.git'
  };
  result.keywords = [
    'INSERT_KEYWORDS'
  ];
  result.author = conf.get('init-author-name') + ' <' + conf.get('init-author-email') + '>';
  result.license = conf.get('init-license');

  result.dependencies = deps || {};
  result.devDependencies = devDeps || {};

  return result;
};
