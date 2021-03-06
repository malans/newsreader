class UserFeedSource < ActiveRecord::Base

  belongs_to :user,
    class_name: 'User',
    foreign_key: :user_id,
    primary_key: :id

  belongs_to :feed_source,
    class_name: 'FeedSource',
    foreign_key: :feed_source_id,
    primary_key: :id

end
