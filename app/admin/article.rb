# encoding: UTF-8
ActiveAdmin.register Article do

  menu :label => "Статьи"
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
      f.input :description, :label => "Описание"
      f.input :url, :label => "Url"
      f.input :public, :label => "Опубликованно"
      f.input :ord
      f.input :meta_title, :label => "title"
      f.input :meta_description, :label => "description"
      f.input :meta_keywords, :label => "keywords"
    end
    f.actions
  end
  
  controller do
    def permitted_params
      params.permit(:article => [:name, :short_description, :description, :url, :public, :ord, :meta_title, :meta_description, :meta_keywords])
    end
  end
  
end
