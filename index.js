'use strict'

const packageJSON = require('package-json')
const { URL } = require('url')
const registryUrl = require('registry-url');
const got = require('got');
const registryAuthToken = require('registry-auth-token')
const semver = require('semver')

class packageNotFound extends Error {
    constructor(packageName) {
        super(`Package \` ${packageName} \` can not be found `)
        this.name = `packageNotFound`
    }
}
class packageVersionNotFound extends Error {
    constructor(packageName, version) {
        super(`version \` ${version} \` of package \` ${packageName} \` can not be found `)
        this.name = `packageVersionNotFound`
    }
}

module.exports = async (name, options) => {
    options = {
		version: 'latest',
		...options
	};
	const scope = name.split('/')[0];
	const regUrl = registryUrl(scope);
	const pkgUrl = new URL(encodeURIComponent(name).replace(/^%40/, '@'), regUrl);
	const authInfo = registryAuthToken(regUrl.toString(), {recursive: true});

	const headers = {
		accept: 'application/vnd.npm.install-v1+json; q=1.0, application/json; q=0.8, */*'
	};

	if (options.fullMetadata) {
		delete headers.accept;
	}

	if (authInfo) {
		headers.authorization = `${authInfo.type} ${authInfo.token}`;
	}

	// Gretting the response from the server
	let response;
	try {
		response = await got(pkgUrl, {json: true, headers});
	} catch (error) {
		if (error.statusCode === 404) {
			throw new packageNotFound(name);
		}

		throw error;
	}

	let data = response.body;

	if (options.allVersions) {
		return data;
	}

	let {version} = options;
	const versionError = new packageVersionNotFound(name, version);

	if (data['dist-tags'][version]) {
		data = data.versions[data['dist-tags'][version]];
	} else if (version) {
		if (!data.versions[version]) {
			const versions = Object.keys(data.versions);
			version = semver.maxSatisfying(versions, version);

			if (!version) {
				throw versionError;
			}
		}

		data = data.versions[version];

		if (!data) {
			throw versionError;
		}
	}

	return data;
}

module.exports.packageNotFound = packageNotFound;
module.exports.packageVersionNotFound = packageVersionNotFound