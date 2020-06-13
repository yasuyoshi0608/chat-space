# README

# chat-space DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|string|null: false|
|email|string|null: false|
|password|string|null: false|
|nickname|string|null: false|
|group_id|string|
### Association
- has_many :messages
- has_many :groups, :throught: :members

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|group_id|string|null: false|
|user_id|string|null: false, foreign_key: true|
### Association
- has_many :users
- has_many :messages

## messageテーブル
|Column|Type|Options|
|------|----|-------|
|text|text|null: false|
|user_id|integer|null: false, foreign_key: true|
|group_id|string|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user