terraform {
 backend "s3" {
 encrypt = true
 bucket = "user-admin-terraform-state"
 dynamodb_table = "user-admin-terraform-state-lock"
 region = "eu-west-2"
 key = "user-admin-terraform-state-s3-web-assets-dev"
 }
}