class CreateMenus < ActiveRecord::Migration
  def change
    create_table :menus do |t|
      t.string :name
      t.text :short_description
      t.string :url, :unique => true, :null => false
      t.boolean :public, :default => false, :null => false
      t.integer :ord, :default => '1', :null => false

      t.timestamps
    end
  end
end
