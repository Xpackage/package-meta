

export default class packageNotFound extends Error {
    constructor(packageName){
        super(`Package \` ${packageName} \` can not be found `)
        this.name = `packageNotFound`
    }
}

export default class packageVersionNotFound extends Error{
    constructor(packageName , version){
        super(`version \` ${version} \` of package \` ${packageName} \` can not be found `)
    }
}