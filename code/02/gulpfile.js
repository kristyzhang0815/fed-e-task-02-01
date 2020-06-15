// exports.foo = done => {
//   console.log('foo task working~')
//   done()
// }
// exports.default = done => {
//   console.log('defaul task working~')
//   done()
// }
const { src ,dest ,series, parallel,watch} = require('gulp')
// const babel = require('gulp-babel')
// const swig = require('gulp-swig')
// const imagemin = require('gulp-imagemin')

const del = require('del')
const loadPlugins = require('gulp-load-plugins')
const plugins = loadPlugins()
const browserSync = require('browser-sync')
const bs = browserSync.create()

const data ={
  pkg:{
    name : 'kristy zhang',
    description: 'hello world'
  }
}
const style  = () =>{
  return src('src/assets/styles/*.scss',{ base: 'src'})
    .pipe(plugins.sass({ outputStyle: 'expanded' }))
    .pipe(dest('temp'))
    .pipe(bs.reload({stream:true}))
}


const script = () => {
  return src('src/assets/scripts/*.js',{ base:'src' })
    .pipe(plugins.babel({ presets:['@babel/preset-env']}))
    .pipe(dest('temp'))
    .pipe(bs.reload({stream:true}))
}

const page = () =>{
  return src('src/*.html',{base:'src'})
    .pipe(plugins.swig({ data,defaults:{cache:false}}))
    .pipe(dest('temp'))
    .pipe(bs.reload({stream:true}))
}


const image = () =>{
  return src('src/assets/images/**',{base:'src'})
  .pipe(plugins.imagemin())
  .pipe(dest('temp'))
}

const font = () =>{
  return src('src/assets/fonts/**',{base:'src'})
  .pipe(plugins.imagemin())
  .pipe(dest('temp'))
}

const extra = () => {
  return src('public/**',{base:'public'})
  .pipe(dest('temp'))
}

const clean = ()=> {
  return del(['temp'])
}

const serve = () =>{

  watch('src/assets/styles/*.scss',style)
  watch('src/assets/scripts/*.js',script)
  watch('src/*.html',page)

  // watch('src/assets/images/**',image)
  // watch('src/assets/fonts/**',font)
  // watch('public/**',extra)

  watch([
    'src/assets/images/**',
    'src/assets/fonts/**',
    'public/**'
  ],bs.reload)

  bs.init({
    notify: false,
    port: 8080,
    open: false,
    // files: 'temp/**',
    server: {
      baseDir: ['temp','src','public'],
      routes: {
        '/node_modules': 'node_modules'
      }
    }
  })
}


const useref = () =>{
  return src('temp/*.html',{base: 'temp'})
      .pipe(plugins.useref({
        searchPath: ['temp','.']
      }))
      .pipe(plugins.if(/\.js$/,plugins.uglify()))
      .pipe(plugins.if(/\.css$/,plugins.cleanCss()))
      .pipe(plugins.if(/\.html$/,plugins.htmlmin({
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true
      })))
      .pipe(dest('dist'))
}
// const compile = parallel(style,script,page,image,font)
const compile = parallel(style,script,page)

// const build = series(clean,parallel(compile,extra))
const build = series(
  clean,
  parallel(
    series(compile,useref),
    image,
    font,
    extra
    )
  )


const develop = series(compile,serve)

module.exports = {
  clean,
  build,
  develop
}