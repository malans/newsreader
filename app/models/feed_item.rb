class FeedItem < ActiveRecord::Base
  validates :url, uniqueness: true;
  belongs_to :feed_source,
    class_name: 'FeedSource',
    foreign_key: :feed_source_id,
    primary_key: :id
end
