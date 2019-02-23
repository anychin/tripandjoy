# encoding: UTF-8
ActiveAdmin.register Mission do

  menu :label => "Миссии"
  scope "Опубликованныe", :public, :default => true
  scope "Неопубликованные", :nopublic
  
  index do
    selectable_column
    column "Название", :name
    column "Фото" do |m|
      if !m.cover.nil? 
        image_tag(m.cover.icon.url)
      end
    end

    default_actions
  end
  
  form(:html => { :multipart => true }) do |f|
    f.inputs do
      f.input :name, :label => "Название"
      f.input :short_description, :label => "Краткое описание"
      f.input :cover, :label => "Обложка",  :hint => (image_tag(f.object.cover.icon.url) unless f.object.cover.nil?)
      f.input :description, :label => "Полное описание"
      f.input :public, :label => "Опубликованно"
      f.input :ord
      f.input :acts, as: :check_boxes, :label => "Действия"
    end
    f.actions
  end
  
  controller do
    def permitted_params
      params.permit(:mission => [:name, :short_description, :cover, :description, :public, :ord, :act_ids => []])
    end
  end
  
end
