class Mission < ActiveRecord::Base
  
  #Связь с действиями
  has_and_belongs_to_many :acts, :join_table => :acts_missions
  
  mount_uploader :cover, CoverUploader
  
  scope :public, -> {where(public: true)}
  scope :nopublic, -> {where(public: false)}
  
end
