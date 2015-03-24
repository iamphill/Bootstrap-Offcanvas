require 'scss_lint/rake_task'

SCSSLint::RakeTask.new do |t|
  t.config = '.scss-lint.yml'
  t.files = ['src/sass/']
end

task :default => :scss_lint
