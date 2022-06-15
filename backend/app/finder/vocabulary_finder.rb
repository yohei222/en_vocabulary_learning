# frozen_string_literal: true

class VocabularyFinder
  def initialize(user)
    @user = user
  end

  def search(params)
    base_query(params[:search_text])
  end

  private

  def base_query(search_text)
    vocabularies = @user.vocabularies
    stripped_search_text = search_text.gsub(/　/," ").strip

    vocabularies = if stripped_search_text.present?
      vocabularies.where('vocabulary_en like ?', "%#{stripped_search_text}%")
        .or(vocabularies.where('meaning_ja like ?', "%#{stripped_search_text}%"))
    else
      @user.vocabularies.all
    end

    vocabularies.order(created_at: :desc)
  end
end
