const gulp = require('gulp');
const babel = require('gulp-babel');
const ts = require('gulp-typescript');
const del = require('del');

gulp.task('clean', async () => {
  await del('lib/**');
  await del('es/**');
  await del('dist/**');
});

gulp.task('cjs', () =>
  gulp
    .src(['./es/**/*.js'])
    .pipe(
      babel({
        configFile: '../../.babelrc',
      }),
    )
    .pipe(gulp.dest('lib/')),
);

gulp.task('es', async () => {
  const { execSync } = require('child_process');

  // 使用 tsc 直接编译
  console.log('Running TypeScript compilation...');
  execSync('npx tsc --project tsconfig.pro.json --outDir es --module esnext', { stdio: 'inherit' });
  console.log('TypeScript compilation completed');

  // 然后运行 babel 转换
  console.log('Running Babel transformation...');
  return gulp
    .src(['es/**/*.js'])
    .pipe(
      babel({
        configFile: './.babelrc',
      }),
    )
    .pipe(gulp.dest('es/'));
});

gulp.task('declaration', () => {
  const tsProject = ts.createProject('tsconfig.pro.json', {
    declaration: true,
    emitDeclarationOnly: true,
  });
  return tsProject.src().pipe(tsProject()).pipe(gulp.dest('es/')).pipe(gulp.dest('lib/'));
});

gulp.task('copyReadme', async () => {
  await gulp.src('../../README.md').pipe(gulp.dest('../../packages/hooks'));
});

exports.default = gulp.series('clean', 'es', 'cjs', 'declaration', 'copyReadme');
