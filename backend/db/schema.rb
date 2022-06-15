# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_06_11_172030) do

  create_table "users", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "nickname"
    t.string "email"
    t.text "tokens"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
  end

  create_table "vocabularies", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
    t.bigint "user_id"
    t.string "vocabulary_en", null: false
    t.string "meaning_ja", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id", "vocabulary_en"], name: "index_vocabularies_on_user_id_and_vocabulary_en", unique: true
    t.index ["user_id"], name: "index_vocabularies_on_user_id"
    t.index ["vocabulary_en"], name: "index_vocabularies_on_vocabulary_en"
  end

  create_table "vocabulary_details", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
    t.bigint "vocabulary_id"
    t.integer "comprehension_rate", default: 0, null: false
    t.string "memo", default: ""
    t.index ["vocabulary_id"], name: "index_vocabulary_details_on_vocabulary_id"
  end

  create_table "vocabulary_usages", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
    t.bigint "vocabulary_id"
    t.string "definition", null: false
    t.string "examples", default: ""
    t.index ["vocabulary_id"], name: "index_vocabulary_usages_on_vocabulary_id"
  end

  add_foreign_key "vocabularies", "users"
  add_foreign_key "vocabulary_details", "vocabularies"
  add_foreign_key "vocabulary_usages", "vocabularies"
end
