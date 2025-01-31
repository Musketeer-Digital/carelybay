# google-terraform-iac

Setup Clickhouse on GKE with Terraform

# How to provision

## Requirements

Install latest software:

    - `terraform`
    - `gcloud`

Setup your `gcloud` cli:

```
$ gcloud init
```

Follow the steps to setup your authentication file. 
This step should result a file in path `~/.config/gcloud/application_default_credentials.json`

## Provision resources

Run Terraform:
 
```
terraform plan -var-file=./values.tfvars -out this
```

Review the plan and apply if everything is ok.

```
terraform apply this
```

In the first time running, it will fail because we didn't push the docker image to GCR yet.
Ensure you have docker image and push it to GCR:

```
$ docker tag carelybay-frontend australia-southeast1-docker.pkg.dev/calm-magpie-448712-a9/carelybay-app/carelybay-frontend:latest

$ docker push australia-southeast1-docker.pkg.dev/calm-magpie-448712-a9/carelybay-app/carelybay-frontend:latest
```

Re-run the plan and apply again

## Whitelist IP

Cloudrun will go outside internet with IP in Terraform output `nat_addr`. Whitelist this IP into MongoDB Atlas.


## Invoke the service

Cloudrun is currently deployed with authentication based and required IAM role to access. You need to have authentication token per your GCP IAM account in order to access

Go to Cloud Run console, get the service URL and run following command to verify access

```
curl -H "Authorization: Bearer $(gcloud auth print-identity-token)" https://carelybay-frontend-xxxx.australia-southeast1.run.app
```

# Destroy everything

Run terraform

```
terraform destroy -var-file=./values.tfvars
```

Proceed next steps when prompted