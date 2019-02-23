class CreateArticles < ActiveRecord::Migration
  def change
    create_table :articles do |t|
      t.string :name, :null => false 
      t.text :short_description
      t.text :description
      t.string :url, :unique => true, :null => false  
      t.boolean :public, :default => false, :null => false
      t.integer :ord, :default => '1', :null => false
      t.text :meta_title
      t.text :meta_description
      t.text :meta_keywords

      t.timestamps
    end
  end
end
