class WelcomeController < ApplicationController
  def index
    @url = ""
  end
  
  def get_tickets
    require 'digest/md5'
    require 'cgi'

    #Вынести в натсройки
    token = '42fa9dcfa06fdc6930f912883d207f92'
    marker = '26930'
    locate = 'ru'
    search_params = params[:search_params]
    
    result = {}
    result["error"] = false

    if !search_params
      result["error"] = true
    else
      res = Array.new
      search_params.each do |key, s_p|
        #Сигнатура
        signature = Digest::MD5.hexdigest([token, marker, *s_p.values_at(*s_p.keys.sort)].join(':'))
        #url
        uri = URI.parse('http://nano.aviasales.ru/searches.json?locate='+locate)
        http = Net::HTTP.new(uri.host, uri.port)
        request = Net::HTTP::Post.new(uri.request_uri)
        #Параметры для запроса
        my_params = Hash.new
        my_params["signature"] = signature
        my_params["enable_api_auth"] = "true"
        my_params["search[marker]"] = marker
        s_p.each do |k, v|
          my_params["search[params_attributes][#{k}]"] = v
        end
        #запрашиваем
        request.set_form_data(my_params)
        response = http.request(request)
        #результат
        res << response.body
      end
      result["res"] = res
    end
    
    respond_to do |format|
      format.json {
        render :json => result
      }
    end
  end
end
