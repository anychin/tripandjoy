set :stage, :production
server 'tripnjoy.icfdev.ru', user: 'wwwtripnjoy', port: 230, roles: %w{web app db}
set :rails_env, :production
set :branch, ENV['BRANCH'] || 'master'
fetch(:default_env).merge!(rails_env: :production)
