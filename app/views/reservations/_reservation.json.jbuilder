json.extract! reservation, :id, :title, :date, :created_at, :updated_at
json.url reservation_url(reservation, format: :json)
