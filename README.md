# package-meta-d 

> Get metadata of a package from the npm registry


## Install

```
$ npm install package-meta-d
```


## Usage

```js
const packageJson = require('package-meta-d');

(async () => {
	console.log(await packageJson('angular'));
	//=> {name: 'ava', ...}

	// Also works with scoped packages
	console.log(await packageJson('@angular/cli'));
})();
```


## API

### packageJson(name, [options])

#### name

Type: `string`

Name of the package.

#### options

Type: `Object`

##### version

Type: `string`<br>
Default: `latest`

Package version such as `1.0.0` or a [dist tag](https://docs.npmjs.com/cli/dist-tag) such as `latest`.

The version can also be in any format supported by the [semver](https://github.com/npm/node-semver) module. For example:

- `1` - Get the latest `1.x.x`
- `1.2` - Get the latest `1.2.x`
- `^1.2.3` - Get the latest `1.x.x` but at least `1.2.3`
- `~1.2.3` - Get the latest `1.2.x` but at least `1.2.3`

##### fullMetadata

Type: `boolean`<br>
Default: `false`

By default, only an abbreviated metadata object is returned for performance reasons. [Read more.](https://github.com/npm/registry/blob/master/docs/responses/package-metadata.md)

##### allVersions

Type: `boolean`<br>
Default: `false`

Return the [main entry](https://registry.npmjs.org/ava) containing all versions.

### packageJson.packageNotFound

The error thrown when the given package name cannot be found.

### packageJson.packageVersionNotFound

The error thrown when the given package version cannot be found.


## Authentication

Both public and private registries are supported, for both scoped and unscoped packages, as long as the registry uses either bearer tokens or basic authentication.


