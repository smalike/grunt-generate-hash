# grunt-generate-hash

> The best Grunt plugin ever.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-generate-hash --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-generate-hash');
```

## The "generate_hash" task

### Overview
In your project's Gruntfile, add a section named `generate_hash` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  generate_hash: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```
### Options

#### algorithm

Type: `string`

Default: `'md5'`

lgorithm is dependent on the available algorithms supported by the version of OpenSSL on the platform. Examples are `'sha1'`, `'md5'`, `'sha256'`, `'sha512'`, etc. On recent releases, `openssl list-message-digest-algorithms` will display the available digest algorithms.

#### hashlen

Type: `number`

Default: `8`

Number of characters of the file hash to prefix the file name with.

### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  generate_hash: {
    options: {},
    files: [{
        expand: true,
        cwd: 'src',
        src: ['**/*.{png,jpg,jpeg,gif,js,css}'],
        dest: 'static'
    }]
  },
});
```
## Release History
_(Nothing yet)_
# grunt-generate-hash
