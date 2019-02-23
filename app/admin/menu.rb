# encoding: UTF-8
ActiveAdmin.register Menu do
  
  menu :label => "Меню"
  scope "Опубликованныe", :public, :default => true
  scope "Неопубликованные", :nopublic
  
  index do
    selectable_column
    column "Название", :name
    column "Url", :url
    default_actions
  end
  
  form(:html => { :multipart => true }) do |f|
    f.inputs do
      f.input :name, :label => "Название"
      f.input :short_description, :label => "Краткое описание"
      f.input :url, :label => "Url"
      f.input :public, :label => "Опубликованно"
      f.input :ord
    end
    f.actions
  end
  
  controller do
    def permitted_params
      params.permit(:menu => [:name, :short_description, :url, :public, :ord])
    end
  end
  
end
