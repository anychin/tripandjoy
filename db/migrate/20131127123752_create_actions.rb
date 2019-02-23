class CreateActions < ActiveRecord::Migration
  def change
    create_table :acts do |t|
      t.string :name, :null => false 
      t.text :short_description
      t.string :cover
      t.text :description
      t.boolean :public, :default => false, :null => false
      t.integer :ord, :default => '1', :null => false
      t.float :price
      t.string :origin_name
      t.integer :mission_id
      #t.text :meta_title
      #t.text :meta_description
      #t.text :meta_keywords

      t.timestamps
    end
  end
end
