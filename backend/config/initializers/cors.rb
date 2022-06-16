# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin AJAX requests.

# Read more: https://github.com/cyu/rack-cors

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins = case Rails.env
              when 'development', 'test'
                ['http://localhost:3001']
              when 'production'
                ['https://en-vocabulary-learning.netlify.app']
              end
    origins(origins)

    resource '*',
      headers: :any,
      expose: ["access-token", "uid", "client"],
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      credentials: true
  end
end
