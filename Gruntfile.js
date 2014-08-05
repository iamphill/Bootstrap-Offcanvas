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
                tasks: ["sass"],
                options: {
                    livereload: true
                }
            },
            coffee: {
                files: ["src/coffee/*.coffee"],
                tasks: ["coffee"],
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
            }
        },
        coffee: {
            compile: {
                files: {
                    "dist/js/bootstrap.offcanvas.js": "src/coffee/bootstrap.offcanvas.coffee"
                }
            }
        }
    });

    // Load grunt tasks
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-coffee');

    // Grunt tasks
    grunt.registerTask("default", ["watch"]);
};
