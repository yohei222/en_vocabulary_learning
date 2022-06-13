# frozen_string_literal: true

class V1::VocabulariesController < ApplicationController
  before_action :authenticate_v1_user!

  def index
    vocabularies = current_v1_user.vocabularies.order(created_at: :desc)

    render status: :ok, json: vocabularies, each_serializer: ::VocabularySerializer
  end

  def create
    vocabulary = ::VocabularyService.create!(current_v1_user, create_params)

    render status: :ok, json: vocabulary, serializer: ::VocabularySerializer
  rescue => e
    render status: :bad_request, json: { message: "Bad Request" }
  end

  private

  def create_params
    params.permit(
      :vocabulary_en,
      :meaning_ja,
      vocabulary_detail: [:comprehension_rate, :memo]
    )
  end
end
