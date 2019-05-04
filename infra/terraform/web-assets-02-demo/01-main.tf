module "s3-web-assets" {
  source = "./../modules/web-s3"
  aws_region = "${var.aws_region}"
  bucket_name = "${var.bucket_name}"
 }