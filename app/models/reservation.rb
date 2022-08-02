class Reservation < ApplicationRecord
  has_many :attendees, dependent: :destroy
  has_many :attended_members, through: :attendees, source: :member
end
