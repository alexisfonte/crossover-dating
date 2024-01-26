class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :firstname
      t.integer :dob_day
      t.integer :dob_month
      t.integer :dob_year
      t.boolean :show_gender
      t.string :gender_identity
      t.string :gender_interest
      t.string :email
      t.string :image_url
      t.text :bio
      t.string :password_digest
      t.string :password_reset_token
      t.datetime :password_reset_timestamp
      t.string :sexual_orientation
      t.string :show_sexual_orientation

      t.timestamps
    end
  end
end
