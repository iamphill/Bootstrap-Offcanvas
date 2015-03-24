module.exports = function(grunt) {
    // Init grunt
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        /**
        * Watch files for changes
        **/
        watch: {
            sass: {
                files: ["src/sass/*.scss"],
                tasks: ["sass", 'autoprefixer'],
                options: {
                    livereload: true
                }
            },
            coffee: {
                files: ["src/coffee/*.coffee"],
                tasks: ["coffee", "uglify:js"],
                options: {
                    livereload: true
                }
            },
            livereload: {
                files: "example/index.html",
                options: {
                    livereload: true
                }
            }
        },
        /**
        * Run node-sass
        **/
        sass: {
            uncompressed: {
                files: {
                    "dist/css/bootstrap.offcanvas.css": "src/sass/bootstrap.offcanvas.scss"
                }
            },
            dist: {
                options: {
                    outputStyle: "compressed"
                },
                files: {
                    "dist/css/bootstrap.offcanvas.min.css": "src/sass/bootstrap.offcanvas.scss"
                }
            },
            test_css: {
                files: {
                    "tests/css/bootstrap.offcanvas.css": "src/sass/bootstrap.offcanvas.test.scss"
                }
            }
        },
        autoprefixer: {
            uncompressed: {
              src: 'dist/css/bootstrap.offcanvas.css',
              desc: 'dist/css/bootstrap.offcanvas.css'
            },
            dist: {
              src: 'dist/css/bootstrap.offcanvas.min.css',
              dest: 'dist/css/bootstrap.offcanvas.min.css'
            },
            test: {
              src: 'tests/css/bootstrap.offcanvas.css',
              dest: 'tests/css/bootstrap.offcanvas.css'
            }
        },
        coffee: {
            compile: {
                files: {
                    "dist/js/bootstrap.offcanvas.js": "src/coffee/bootstrap.offcanvas.coffee"
                }
            }
        },
        uglify: {
            js: {
                options: {
                    banner: "/*\n" + grunt.file.read("LICENSE") + "*/\n"
                },
                files: {
                    "dist/js/bootstrap.offcanvas.min.js": ["dist/js/bootstrap.offcanvas.js"]
                }
            }
        },
        qunit: {
            all: ["tests/*.html"]
        },
        bootlint: {
          files: ['example/index.html']
        }
    });

    // Load grunt tasks
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-bootlint');

    // Grunt tasks
    grunt.registerTask("default", ["watch"]);
    grunt.registerTask("tests", ['bootlint', 'qunit']);
};
