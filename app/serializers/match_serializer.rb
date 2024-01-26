class MatchSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :liked, :viewed_user_id, :pair_id, :last_read
end
