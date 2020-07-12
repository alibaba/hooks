const gulp = require('gulp');
const babel = require('gulp-babel');
const ts = require('gulp-typescript');
const del = require('del');

gulp.task('clean', async () => {
  await del('lib/**');
  await del('es/**');
  await del('dist/**');
});

gulp.task('cjs', () => {
  const tsProject = ts.createProject('tsconfig.json', {
    module: 'CommonJS',
  });
  return tsProject
    .src()
    .pipe(tsProject())
    .pipe(
      babel({
        configFile: '../../.babelrc',
      }),
    )
    .pipe(gulp.dest('lib/'));
});

gulp.task('es', () => {
  const tsProject = ts.createProject('tsconfig.json', {
    module: 'ESNext',
  });
  return tsProject
    .src()
    .pipe(tsProject())
    .pipe(
      babel({
        configFile: '../../.babelrc',
      }),
    )
    .pipe(gulp.dest('es/'));
});

gulp.task('declaration', () => {
  const tsProject = ts.createProject('tsconfig.json', {
    declaration: true,
    emitDeclarationOnly: true,
  });
  return tsProject.src().pipe(tsProject()).pipe(gulp.dest('es/')).pipe(gulp.dest('lib/'));
});

gulp.task('copyReadme', async () => {
  await gulp.src('../../README.md').pipe(gulp.dest('../../packages/hooks'));
});

exports.default = gulp.series('clean', 'cjs', 'es', 'declaration', 'copyReadme');
