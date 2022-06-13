class CreateVocabularyDetails < ActiveRecord::Migration[6.0]
  def change
    create_table :vocabulary_details do |t|
      t.references :vocabulary, foreign_key: true
      t.integer :comprehension_rate, null: false, default: 0
      t.string :memo, default: ''
    end
  end
end
