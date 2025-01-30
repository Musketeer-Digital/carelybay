# google-terraform-iac

Setup Clickhouse on GKE with Terraform

# How to provision

## Requirements

Install latest software:

    - `terraform`
    - `gcloud`
    - `kubectl`

Setup your `gcloud` cli:

```
$ gcloud init
```

Follow the steps to setup your authentication file. 
This step should result a file in path `~/.config/gcloud/application_default_credentials.json`

## Provision resources

There are 4 steps:

0. Provision GCS bucket and update values
1. Provision GCP resources: VPC, Subnet, GKE cluster
2. Setup Clickhouse domain point to Ingress Controller
3. Deploy Clickhouse cluster with TLS enabled

Step 0: Provision GCS bucket and update values for Terraform

Go to GCS and create a bucket to store Terraform state. We don't manage this state by Terraform to avoid mistaken destroying everything.

Open file `providers.tf` and update configuration
 
```
    backend "gcs" {
      bucket = "blinks-gg-terraform-state-0kzj" # bucket_name
      prefix  = "terraform/clickhouse"
    }
```

Open file `values.tfvars` and update variables accordingly.

```
project_id = "seraphic-spider-445423-f4" # gcp project id, fill in manually.
region = "us-central1" # region you want to deploy Clickhouse.
zone   = "us-central1-c" # main zone you want to deploy Clickhouse.
gke_machine_type = "n1-standard-1" # gke worker nodes
gke_cluster_provisioned = false # control whether to GKE is ready for Kubernetes deployment. Value should be `false` in first setup. After GKE was provisioned, change to `true` to deploy Clickhouse.
clickhouse_domain = "clickhouse.blinks.gg" # Clickhouse domain
clickhouse_admin_password_sha256_hex = "ae414bc54aa0ae40cd20d3f239607f51170f039969cf7bab8d90376b6f0b9e0d" ##echo -n "blinks_admin" | sha256sum => password is `blinks_admin`
```

Step 1: Provision GCP resources

Open `values.tfvars` file and make sure variable `gke_cluster_provisioned` set to `false` in first step.
This is to avoid the circular dependency of Kubernetes deployment when GKE not provisioned yet

Run Terraform:

```
terraform plan -var-file=./values.tfvars -out this
```

Review the plan and apply if everything is ok

```
terraform apply this
```

Wait for Terraform to completd. By end of this step, there is an output of Load Balancer IP:  `nginx_ingress_ip`



Step 2: Setup DNS

Get the IP address of Load Balancer in step 1.

Setup your domain name point to this domain. 

Verify the step by command: 

```
dig <domain>
```

Output should be IP address of Load Balancer.

This is to prepare for next step of requesting free SSL cert from Let's Encrypted

Step 3: Deploy Kubernetes resources

Open `values.tfvars` file and update variables:

- `gke_cluster_provisioned` -> `true`
- `clickhouse_domain` -> <domain_in_step_2>

Run Terraform:
 
```
terraform plan -var-file=./values.tfvars -out this
```

Review the plan and apply if everything is ok.

```
terraform apply this
```


Notes:

- The process of cert-manager to request free SSL cert may vary depends on workload of Let's Encrypted, but it should be less than 10 minutes. If longer, need to double-check and investigate if any.
- The domain name must be resolvable before apply step 3. Let's Encrypted use HTTP challenges, so if the domain is not resolved, then it will be failed.


Important: After everything provisioned, setup env var as follow:

```
export KUBE_CONFIG_PATH=~/.kube/config
```


# Verification

Access to `https://[clickhouse_domain]/play`, it should load Clickhouse web UI interface.
Try to execute some queries with username is `admin`, password is plaintext of what you set in `values.tfvars` previously.


# Destroy everything

Run terraform

```
terraform destroy -var-file=./values.tfvars
```

Proeced next steps when prompted

# Some administration activities

## Update admin password

The password is store in SHA256 hash in code. To change new password, follow below steps:

- Create new hashed password: `echo -n "your_new_pass" | 256shasum`
- Open  `values.tfvars` file and update variable `clickhouse_admin_password_sha256_hex` with that new value
- Re-run Terraform

```
terraform plan -var-file=./values.tfvars -out this
terraform apply this
```

## Update GKE node sizing

- Open  `values.tfvars` file and update to new node type variable `gke_machine_type`
- Re-run Terraform

```
terraform plan -var-file=./values.tfvars -out this
terraform apply this
```
