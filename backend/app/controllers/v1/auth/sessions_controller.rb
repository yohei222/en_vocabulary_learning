class V1::Auth::SessionsController < ApplicationController

  def index
    if current_v1_user
      render json: { status: 200, is_logged_in: true, data: current_v1_user }
    else
      render json: { status: 401, is_logged_in: false }
    end
  end
end
