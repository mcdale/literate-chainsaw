'use strict';

module.exports = function(grunt) {

	grunt.initConfig({

		dir: {
			webapp: 'src/main/webapp',
			dist: 'src/main/resources/static',
			bower_components: 'bower_components'
		},

		connect: {
			options: {
				port: 4020,
				hostname: '*'
			},
			src: {},
			dist: {}
		},

		openui5_connect: {
			options: {
				resources: [
					'<%= dir.webapp %>/resources'
				]
			},
			src: {
				options: {
					appresources: '<%= dir.webapp %>'
				}
			},
			dist: {
				options: {
					appresources: '<%= dir.dist %>'
				}
			}
		},

		openui5_preload: {
			component: {
				options: {
					resources: {
						cwd: '<%= dir.webapp %>',
						prefix: 'todo'
					},
					dest: '<%= dir.dist %>'
				},
				components: true
			}
		},

		clean: {
			dist: '<%= dir.dist %>/'
		},

		symlink: {
		  options: {
		    // Enable overwrite to delete symlinks before recreating them
		    overwrite: true,
		    // Enable force to overwrite symlinks outside the current working directory
		    force: true
		  },
		  // The "build/target.txt" symlink will be created and linked to
		  // "source/target.txt". It should appear like this in a file listing:
		  // build/target.txt -> ../source/target.txt
		  explicit: {
		    src: '/Users/marc/Developer/openui5-runtime-1.42.6/resources',
		    dest: '<%= dir.dist %>/resources'
		  }
		},

		copy: {
			dist: {
				files: [ {
					expand: true,
					cwd: '<%= dir.webapp %>',
					src: [
						'**',
						'!test/**'
					],
					dest: '<%= dir.dist %>'
				} ]
			}
		},

		eslint: {
			webapp: ['<%= dir.webapp %>']
		}

	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-symlink')
	grunt.loadNpmTasks('grunt-openui5');
	grunt.loadNpmTasks('grunt-eslint');

	// Server task
	grunt.registerTask('serve', function(target) {
		grunt.task.run('openui5_connect:' + (target || 'src') + ':keepalive');
	});

	// Linting task
	grunt.registerTask('lint', ['eslint']);

	// Build task
	grunt.registerTask('build', ['openui5_preload', 'symlink', 'copy']);

	// Default task
	grunt.registerTask('default', [
		'lint',
		'clean',
		'build',
		'serve:dist'
	]);
};
