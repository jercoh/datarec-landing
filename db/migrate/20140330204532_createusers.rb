class Createusers < ActiveRecord::Migration
	def change
		create_table :users do |t|
			t.string :email, :null => false, :default => ""
			t.string :company, :null => false

			t.timestamps
	end
	add_index :users, :email, unique: true
	add_index :users, :company
	end
end
