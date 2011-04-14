#!/usr/bin/env node

var path = require('path');
var fs = require('fs');
var Hash = require('hashish');

var argv = require('optimist').argv;
var cmd = argv._.shift();

var root = process.env.HACKMAN_ROOT || process.env.HOME + '/.sandman';
var rootEx = path.existsSync(root);

var dirs = {
    active : root + '/active',
    packages : root + '/packages',
};

if (cmd === 'init') {
    if (argv._[0]) {
        root = path.resolve(argv._[0]);
        rootEx = path.existsSync(root);
    }
    
    if (!rootEx) fs.mkdirSync(root, 0700);
    
    Hash(dirs).forEach(function (dir) {
        if (!path.existsSync(dir)) fs.mkdirSync(dir, 0700);
    });
    
    console.log(
        'Initialized sandman at ' + root
        + '\nNow add this to your ~/.bashrc:'
        + '\n    eval $(sandman env)'
    );
}
else if (!rootEx) {
    console.error(
        'Hackman directory ' + root + ' does not exist.'
        + '\nType `sandman init` to create it.'
    );
    process.exit(1);
}
else if (cmd === 'env') {
    var env = {
        PATH : process.env.PATH.split(':'),
        LD_LIBRARY_PATH : process.env.LD_LIBRARY_PATH.split(':'),
    };
    
    var actives = {
        PATH : 'bin',
        LD_LIBRARY_PATH : 'lib',
    };
    
    Hash(env).forEach(function (paths, name) {
        var dir = dirs.active + '/' + actives[name];
        if (paths.indexOf(dir) < 0) {
            paths.unshift(dir);
        }
    });
    
    function rejoin (ps) {
        return "'" + ps.map(function (p) {
            return p
                .replace(/\\/g, '\\\\')
                .replace(/'/g, "\\'")
                .replace(/:/g, '\\:')
            ;
        }).join(':') + "'";
    }
    
    console.log(
        "# Add `eval $(sandman env)` to your ~/.bashrc"
        + "\nexport PATH=" + rejoin(env.PATH)
        + "\nexports LD_LIBRARY_PATH=" + rejoin(env.LD_LIBRARY_PATH)
    );
}
else if (cmd === 'load') {
    
}
else if (cmd === 'unload') {
    
}
