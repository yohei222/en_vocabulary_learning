Rails.application.routes.draw do
  namespace :v1 do
    mount_devise_token_auth_for "User", at: "auth"

    namespace :auth do
      resources :sessions, only: %i[index]
    end
  end
end
