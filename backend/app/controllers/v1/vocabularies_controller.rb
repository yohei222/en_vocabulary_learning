# frozen_string_literal: true

class V1::VocabulariesController < ApplicationController
  before_action :authenticate_v1_user!

  def index
    finder = ::VocabularyFinder.new(current_v1_user)
    vocabularies = finder.search(search_params)

    render status: :ok, json: vocabularies, each_serializer: ::VocabularySerializer
  end

  def create
    vocabulary = ::VocabularyService.create!(current_v1_user, create_params)

    head :ok
  rescue => e
    render status: :bad_request, json: { message: "Bad Request" }
  end

  def update
    vocabulary = current_v1_user.vocabularies.find(update_params[:id])
    raise Exceptions::HTTP::BadRequest if vocabulary.nil?

    specification = ::VocabularyUsages::DeleteSpecification.new(vocabulary)
    is_vocabulary_en_changed = specification.satisfied_by?(vocabulary_en_param(params))

    ActiveRecord::Base.transaction do
      ::VocabularyUsageService.bulk_delete!(vocabulary) if is_vocabulary_en_changed
      vocabulary = ::VocabularyService.update!(vocabulary, update_params, is_vocabulary_en_changed)

      head :ok
    end
  rescue => e
    render status: :bad_request, json: { message: "Bad Request" }
  end

  def bulk_destroy
    vocabularies = current_v1_user.vocabularies.where(id: bulk_destroy_params["body"]["ids"])
    ::VocabularyService.bulk_delete!(vocabularies)

    head :ok
  rescue => e
    render status: :bad_request, json: { message: "Bad Request" }
  end

  private

  def search_params
    params.permit(
      :search_text
    )
  end

  def create_params
    params.permit(
      :vocabulary_en,
      :meaning_ja,
      vocabulary_detail: [:comprehension_rate, :memo]
    )
  end

  def update_params
    params.permit(
      :id,
      :vocabulary_en,
      :meaning_ja,
      vocabulary_detail: [:comprehension_rate, :memo]
    )
  end

  def bulk_destroy_params
    params.permit(body: {ids: []})
  end

  def vocabulary_en_param(params)
    params["vocabulary_en"]
  end
end
