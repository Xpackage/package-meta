const gulp = require('gulp');

gulp.task('default',['watchFiles'],() => {
    return gulp
            .src(`${__dirname}/src/*.js`)
            .pipe(gulp.dest(`${__dirname}/build/`))
})

gulp.task('default',() => {
    log('helloosds')
})




export default class sudon   {
    constructor(app){}

}


gulp.task('watchFiles',() => {
    gulp.watch(`${__dirname}/src/*.js`,['testChangeDetect'],(event) => {
        console.log(`watched event ${event.type} for ${event.path}`)
    })
})

