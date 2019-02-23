class MissionActions < ActiveRecord::Migration
  def change
    create_table :acts_missions do |t|
      t.integer :mission_id
      t.integer :act_id

      t.timestamps
    end
  end
end
