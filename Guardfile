# disabling guard console
interactor :off

guard 'compass', :configuration_file => 'config/compass.rb' do
  puts "Starting to watch SCSS files with Compass."
  watch(%r{^app/sass/.*\.scss$})
end

guard 'livereload' do
  watch(%r{^app/})
end