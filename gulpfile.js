//引入gulp
var fs = require('fs');
var gulp = require('gulp');

var concat = require('gulp-concat');           //合并
var jshint = require('gulp-jshint');           //js规范验证
var uglify = require('gulp-uglify');           //压缩
var rename = require('gulp-rename');          //文件名命名
var clean = require('gulp-clean');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var rjs = require('requirejs');
var minifyHTML   = require('gulp-minify-html'); //压缩html
var minifycss = require('gulp-minify-css');
var htmlreplace = require('gulp-html-replace');


//脚本检查
gulp.task('lint', function () {
    gulp.src('app/base/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

/**
 * 清空产出目录的冗余资源，始终保留最新的生成的资源
 */
gulp.task('clean',function(){
    return gulp.src('dist',{read:false})
        .pipe(clean());
})



//require合并
gulp.task('build',['clean'] ,function(cb){//中间的字符串数组，是指当前任务的依赖任务，即 build任务需要再clean任务执行完再执行，以此来实现异步
  rjs.optimize({
      baseUrl: "app/base",                     //js根目录

      name: 'main',                           //执行的第一个requirejs包

      optimize: 'uglify2',

      mainConfigFile: "app/base/main.js",                 //requirejs的配置文件 例外：路径相对于项目根目录

      removeCombined: true,
      
      paths: {
        angular: '../bower_components/angular/angular.min',
        angularResource:'../bower_components/angular-resource/angular-resource.min',
        jquery:'../bower_components/jquery/dist/jquery.min',
        semantic: 'empty:',
        angularRoute: '../bower_components/angular-route/angular-route.min',
        pretty          :'../bower_components/pretty/pretty',
        uikit:'../bower_components/uieditor/uikit.min',
        codemirror:'empty:',
        markdown:'../bower_components/uieditor/codemirror/mode/markdown/markdown',
        overlay:'../bower_components/uieditor/codemirror/addon/mode/overlay',
        xml:'../bower_components/uieditor/codemirror/mode/xml/xml',
        gfm:'../bower_components/uieditor/codemirror/mode/gfm/gfm',
        marked:'../bower_components/uieditor/marked',
        htmleditor:'../bower_components/uieditor/htmleditor',
        showdown        : "../bower_components/showdown/dist/showdown.min",
        // ueall:'../bower_components/ueditor/ueditor.all',
        // uelan:'../bower_components/ueditor/lang/zh-cn/zh-cn',
        // duoshuo:"../bower_components/changyan/changyan",
        // duoshuore:'empty:'
      },
      shim: {
          'angular' : {'exports' : 'angular'},
        'jquery': {'exports': 'jquery'},
        'angularRoute': ['angular'],
        'angularResource':['angular'],
        'semantic': ['jquery'],
        'pretty':{'exports':'pretty'},

        'uikit':['jquery'],
        'htmleditor':['jquery','uikit','codemirror','marked'],
        'showdown':{'exports':'showdown'},
        // 'duoshuo':['jquery'],
        // 'duoshuore':['jquery','duoshuo']
      },


      out: "app/min/blog.min.js",                 //输出的压缩文件

      findNestedDependencies: true,                               //必须指定让requirejs能找到嵌套的文件

      include: ['require.js']
  }, function(buildResponse){
    // console.log('build response', buildResponse);
    cb();
  }, cb);
});


/*
合并压缩css
 */
gulp.task('conmincss',['build'],function(){
  var cssc = {
        animate:'app/style/animate.css',
        uikit:'app/bower_components/uieditor/uikit.min.css',
        codemirror:'app/bower_components/uieditor/codemirror/lib/codemirror.css',
        // htmleditor:'app/bower_components/uieditor/codemirror/lib/htmleditor.min.css',
        pretty:'app/bower_components/pretty/pretty.css'
    },csscfile=[];
    for(var c in cssc){
        csscfile.push(cssc[c]);
    }
    return gulp.src(csscfile)
      .pipe(concat('blog.min.css'))
      .pipe(minifycss())
      .pipe(gulp.dest('app/min'))
})
/**
 * 对静态资源增加版本控制MD5戳
 */

gulp.task('js&css',['conmincss'],function(){
  return gulp.src(['app/**/*.*'])
        // .pipe(rename())
        // .pipe(rev())
        .pipe(gulp.dest('dist'))
        // .pipe(rev.manifest())
        // .pipe(gulp.dest('app/gulp-build/rev'))
})

gulp.task('js',['clean','js&css'],function(){
    return gulp.src(['app/min/blog.min.js'])
        // .pipe(rename())
        .pipe(rev())
        .pipe(gulp.dest('dist/min'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist/rev/js')) 
})

gulp.task('css',['clean','js&css'],function(){
    return gulp.src(['app/style/*.css'])
        // .pipe(rename())
        .pipe(rev())
        .pipe(minifycss())
        .pipe(gulp.dest('dist/style'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist/rev/css')) 
})
gulp.task('min_css',['clean','js&css'],function(){
    return gulp.src(['app/min/*.css'])
        // .pipe(rename())
        .pipe(rev())
        .pipe(gulp.dest('dist/min'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist/rev/min_css')) 
})

gulp.task('rev',['js','css','min_css'],function(){
    return gulp.src(['dist/rev/**/*.json','app/index.html'])//数组前一个是生成的静态资源文件，后一个是需要修改的html模板
        .pipe(revCollector({
            replaceReved:true,
        }))
        .pipe(gulp.dest('dist/'))//将替换过的文件输出即可，这里输出到原来的路径
})

gulp.task('replace',['rev'],function(){
  return gulp.src('dist/index.html')
        .pipe(htmlreplace({
          'require':'min/blog.min.js',
          'css':'min/blog.min.css'
        }))
        .pipe(gulp.dest('dist/'))
})

gulp.task('revrequire',['replace'],function(){
  return gulp.src(['dist/rev/**/*.json','dist/index.html'])
        .pipe(revCollector({
            replaceReved:true,
        }))
        // .pipe(minifyHTML({//HTML压缩
        //     empty:true,
        //     spare:true
        // }))
        .pipe(gulp.dest('dist/'))
})


gulp.task('default', ['clean','conmincss','build','js&css','js','css','min_css','rev','replace','revrequire']);
