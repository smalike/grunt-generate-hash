/*
 * grunt-generate-hash
 * https://github.com/smalike/grunt-generate-hash
 *
 * Copyright (c) 2016 smalike
 * Licensed under the MIT license.
 */

'use strict';
var crypto = require('crypto');
var fs = require('fs');
var path = require('path');

module.exports = function(grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('generate_hash', 'The best Grunt plugin ever.', function() {
        var target = this.target;
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            punctuation: '.',
            separator: ', ',
            algorithm: 'md5',
            encoding: 'utf8',
            length: 8
        });

        var map = {};

        // Iterate over all specified file groups.
        this.files.forEach(function(f) {
            // Concat specified files.
            var src = f.src.filter(function(filepath) {
                var filepath = getRealPath(filepath, f.cwd);
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).map(function(filepath) {
                return generateHash(f, filepath, options.algorithm, 'hex', options.encoding);
            }).join(grunt.util.normalizelf(options.separator));

        });

        function generateHash(file, filepath, algorithm, encoding, fileEncoding) {
            var fp = getRealPath(filepath, file.cwd);
            if (grunt.file.isDir(fp)) {
                return;
            }
            if (file.dest) {
                if (file.orig.expand) {
                    file.dest = path.dirname(file.dest);
                }
                try{
                    var stat = fs.lstatSync(file.dest);
                    if (stat && !stat.isDirectory()) {
                        grunt.fail.fatal('Destination ' + file.dest + ' for target ' + target + ' is not a directory');
                    }
                } catch(e) {
                    grunt.verbose.writeln('Destination dir ' + file.dest + ' does not exists for target ' + target + ': creating');
                    grunt.file.mkdir(file.dest);
                }
            }
            var content = grunt.file.read(fp);
            var hash = md5(content, algorithm, encoding, fileEncoding);
            var suffix = hash.slice(0, options.length);
            var ext = path.extname(filepath);
            var newName = [path.basename(filepath, ext), suffix, ext.slice(1)].join('.');
            var resultPath = path.resolve(file.dest, path.dirname(filepath), newName);

            var key = path.relative(file.orig.dest, file.dest);
            var outKey = path.relative(file.orig.dest, resultPath);

            grunt.file.copy(fp, resultPath);

            // grunt.log.writeln('Generated: ' + resultPath);
            // map[unixify(key)] = unixify(outKey);
        }
        function md5(content, algorithm, encoding, fileEncoding) {
            return crypto.createHash(algorithm).update(content, fileEncoding).digest(encoding);
        }

        function unixify(path) {
            return path.split('\\').join('/');
        }

        function getRealPath(filepath, cwd) {
            return cwd ? path.join(cwd, filepath) : filepath;
        }
    });

};
