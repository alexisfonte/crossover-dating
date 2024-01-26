require 'securerandom'

class Match < ApplicationRecord
  belongs_to :user
  belongs_to :viewed_user, class_name: "User", foreign_key: "viewed_user_id"

  def self.new_match(params)
    user = User.find(params[:user_id])
    viewed_user = User.find(params[:viewed_user_id])
    exist_match = viewed_user.matches.where(viewed_user_id: params[:user_id])
    if exist_match[0]
      uuid = exist_match[0][:pair_id]
      match = Match.create!(pair_id: uuid, user_id: params[:user_id], viewed_user_id: params[:viewed_user_id], liked: params[:liked])
      if exist_match[0][:liked] == true && params[:liked] == true
        UserMatchChannel.broadcast_to(viewed_user, user)
      end
      return match
    else
      uuid = SecureRandom.uuid
      match = Match.create!(pair_id: uuid, user_id: params[:user_id], viewed_user_id: params[:viewed_user_id], liked: params[:liked])
      return match
    end
  end

end
