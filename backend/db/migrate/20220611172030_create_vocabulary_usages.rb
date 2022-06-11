class CreateVocabularyUsages < ActiveRecord::Migration[6.0]
  def change
    create_table :vocabulary_usages do |t|
      t.references :vocabulary, foreign_key: true
      t.string :definition, null: false
      t.string :example, null: false

      t.timestamps
    end
  end
end
