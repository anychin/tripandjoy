class Menu < ActiveRecord::Base
  
  scope :public, -> {where(public: true)}
  scope :nopublic, -> {where(public: false)}
  
end
