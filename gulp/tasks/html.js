import fileInclude from "gulp-file-include";
import webphtmlNosvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number";
export const html = () => {
	return app.gulp.src(app.path.src.html)
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "HTML",
				message: "Error: <%= error.messafe %>",
			}))
		)
		.pipe(fileInclude())
		.pipe(app.plugins.replace(/@img\//g, 'img/'))
		.pipe(webphtmlNosvg())
		.pipe(
			versionNumber({
				'value': '%DT%',
				'append': {
					'key': '_v',
					'to': [
						'css',
						'js',
					]
				},
				'output': {
					'file': 'gulp/version.json'
				}
			})
		)
		.pipe(app.gulp.dest(app.path.build.html))
		.pipe(app.plugins.browsersync.stream());
}