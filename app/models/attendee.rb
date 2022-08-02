class Attendee < ApplicationRecord
  belongs_to :member
  belongs_to :reservation
end
