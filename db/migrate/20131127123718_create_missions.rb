class CreateMissions < ActiveRecord::Migration
  def change
    create_table :missions do |t|
      t.string :name, :null => false 
      t.text :short_description
      t.string :cover
      t.text :description
      t.boolean :public, :default => false, :null => false
      t.integer :ord, :default => '1', :null => false
      #t.float :price
      
      t.timestamps
    end
  end
end
