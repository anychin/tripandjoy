TripnJoy::Application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  root 'kit#index'
  #Получить билеты
  post '/api/get_tickets' => "welcome#get_tickets"
  
  #Получитьв экшены
  post '/api/get_act' => "kit#get_act"
  
  #Получитьв экшены
  post '/api/get_missions' => "kit#get_missions"
  
  #Главная страница конструктора
  get '/generate' => 'kit#index'
  
  #Статьи
  get ':url' => 'article#get'

  unless Rails.application.config.consider_all_requests_local
    match '*not_found', to: 'errors#error_404', via: [:get, :post]
  end
  
end
