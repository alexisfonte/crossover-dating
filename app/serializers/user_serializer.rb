class UserSerializer < ActiveModel::Serializer
  attributes :id, :firstname, :dob_day, :dob_month, :dob_year, :show_gender, :gender_identity, :gender_interest, :email, :image_url, :bio, :password_digest, :password_reset_token, :password_reset_timestamp, :sexual_orientation, :show_sexual_orientation
end
