# frozen_string_literal: true

class V1::VocabulariesController < ApplicationController
  before_action :authenticate_v1_user!

  def index
    vocabularies = current_v1_user.vocabularies.order(created_at: :desc)

    render status: :ok, json: vocabularies, each_serializer: ::VocabularySerializer
  end

  def create
    # todo Reactの一覧画面の表示ができてから実装する
  end

  private

  def create_params
    params.permit(
      :vocabulary_en,
      :meaning_ja,
      vocabulary_detail: [:comprehension_rate, :memo],
      vocabulary_usages: [:definition, :example]
    )
  end
end
