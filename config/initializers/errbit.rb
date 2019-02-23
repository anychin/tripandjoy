if defined? Airbrake
  Airbrake.configure do |config|
    config.api_key = 'af4b3bd350175cd68e643471dac371ce'
    config.host    = 'errbit.brandymint.ru'
    config.port    = 80
    config.secure  = config.port == 443
  end
end
