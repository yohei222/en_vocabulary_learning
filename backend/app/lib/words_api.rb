# frozen_string_literal: true

class WordsApi
  WORDS_API_DOMAIN = "https://wordsapiv1.p.rapidapi.com/words"

  def self.fetch(word)
    conn = Faraday.new(
      url: 'https://wordsapiv1.p.rapidapi.com/words/' + word,
      headers: {
        "X-RapidAPI-Key" => ENV["X_RAPIDAPI_KEY"],
        "X-RapidAPI-Host" => ENV["X_RAPIDAPI_HOST"]
      }
    )

    res = conn.get
    json = JSON.parse(res.body)

    formatted_results = []
    json["results"].each do |result|
      hash = {}
      hash["definition"] = result["definition"]
      hash["examples"] = (result["examples"] || []).join(", ")

      formatted_results << hash
    end

    return formatted_results
  end

  def self.words_api_request_url(word)
    WORDS_API_DOMAIN + '/words/' + word
  end
end
