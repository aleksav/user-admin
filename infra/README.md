# Infrastructure-as-code

Upon code generation, following steps are required:

* Set AWS access keys as environment variables
```
export AWS_ACCESS_KEY_ID=your_aws_key
export AWS_SECRET_ACCESS_KEY=your_aws_secret
```

* Create terraform state bucket and lock table, by invoking scripts in the terraform-state-s3 folder (only once on project init)

```
cd infra/terraform
docker-compose -f docker-compose.yml run --rm state init
docker-compose -f docker-compose.yml run --rm state plan
docker-compose -f docker-compose.yml run --rm state apply
```

* Manage s3 bucket for web-assets by running script in the web-s3 folder as required

```
cd infra/terraform
docker-compose -f docker-compose.yml run --rm terraform init
docker-compose -f docker-compose.yml run --rm terraform plan
docker-compose -f docker-compose.yml run --rm terraform apply
```
