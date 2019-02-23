# encoding: UTF-8
ActiveAdmin.register Act do

  menu :label => "Действия"
  scope "Опубликованныe", :public, :default => true
  scope "Неопубликованные", :nopublic
  
  index do
    selectable_column
    column "Название", :name
    column "Фото" do |a|
      if !a.cover.nil? 
        image_tag(a.cover.icon.url)
      end
    end
    column "Местоположение", :short_description
    column "Стоимость", :price
    column "Код Аэропорта", :origin_name
    default_actions
  end
  
  form(:html => { :multipart => true }) do |f|
    f.inputs do
      f.input :name, :label => "Название"
      f.input :short_description, :label => "Местоположение"
      f.input :cover, :label => "Обложка",  :hint => (image_tag(f.object.cover.icon.url) unless f.object.cover.nil?)
      f.input :description, :label => "Полное описание"
      f.input :public, :label => "Опубликованно"
      f.input :ord
      f.input :price, :label => "Стоимость"
      f.input :origin_name, :label => "Код Аэропорта"
      f.input :missions, as: :check_boxes, :label => "Миссии"
    end
    f.actions
  end
  
  controller do
    def permitted_params
      params.permit(:act => [:name, :short_description, :cover, :description, :public, :ord, :price, :origin_name, :mission_ids => []])
    end
  end
  
end
