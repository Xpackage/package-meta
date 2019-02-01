'use strict'


const { URL } = require('url')

// const pkgURI = new URL()

const registryUrl = require('registry-url');
 
// console.log(registryUrl());

class packageNotFound extends Error{
    constructor(packageName){
        super(`package \` ${packageName} \` could not be found`)
        this.name = `packageNotFound`
    }
}

class packageVersionNotFound extends Error {
    constructor(packageName , version){
        super(`version \`${version}\` for package \` ${packageName} \` could not be found `)
        this.name = `packageVersionNotFound`
    }
}
const name = '@Usamaliaquat123/45'
const scope = name.split('/')[0];
const regUrl = registryUrl(scope);
const pkgUrl = new URL(encodeURIComponent(name).replace(/^%40/, '@'), regUrl);
const headers = {
    accept : 'application/vnd.npm.install-v1+json; q=1.0, application/json; q=0.8, */*'
}

async () => {
    await delete headers.accept
    console.log(headers.accept)
}





// module.exports = async (name,options) => {
//     options = {
//         version = 'latest',
//         ...options
//     }


// }