class CreateVocabularies < ActiveRecord::Migration[6.0]
  def change
    create_table :vocabularies do |t|
      t.references :user, foreign_key: true
      t.string :vocabulary_en, null: false
      t.string :meaning_ja, null: false

      t.timestamps
    end
  end
end
