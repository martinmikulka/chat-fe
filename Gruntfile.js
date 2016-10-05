module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		banner: "/*\n<%= pkg.name %> v<%= pkg.version %>\nAuthor: <%= pkg.author %>\nDate: <%= grunt.template.today(\"yyyy-mm-dd\") %>\n*/\n\n",

		// JS concatenation and minification
		uglify: {
			options: {
				banner: '<%= banner %>'
			},
			all: {
				src: [
					'./public/lib/jquery/jquery-3.1.1.min.js',
					'./public/src/js/**/*.js',
				],
				dest: './public/dist/js/<%= pkg.name %>.min.js'
			}
		},

		// LESS 2 CSS conversion
		less: {
			options: {
				banner: '<%= banner %>',
			},
			all: {
				src: [
					'./public/src/css/normalize.less',
					'./public/src/css/*.less'
				],
				dest: './public/dist/css/<%= pkg.name %>.css'
			}
		},

		// CSS minification
		cssmin: {
			options: {
				banner: '<%= banner %>',
			},
			all: {
				src: '<%= less.all.dest %>',
				dest: './public/dist/css/<%= pkg.name %>.min.css'
			}
		},

		// Watcher
		watch: {
			options: {
				livereload: true
			},
			gruntfile: {
				files: ['Gruntfile.js'],
				tasks: ['default']
			},
			app: {
				files: [
					'./public/src/**/*',
					'./views/**/*'
				],
				tasks: []
			},
			js: {
				files: ['<%= uglify.all.src %>'],
				tasks: ['uglify']
			},
			less: {
				files: ['<%= less.all.src %>'],
				tasks: ['less']
			},
			css: {
				files: ['<%= less.all.dest %>'],
				tasks: ['cssmin']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Tasks configuration.
	grunt.registerTask('default', ['uglify','less']);
};
