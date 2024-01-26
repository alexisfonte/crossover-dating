class MessageSerializer < ActiveModel::Serializer
  attributes :id, :sender_id, :recipient_id, :content, :pair_id
end
