locals {
  vpc_network_name = "main-network"
  app_subnet  = "app-subnet"
  cloudrun_subnet = "cloudrun-subnet"
  app_subnet_cidr = "10.0.0.0/24"
  cloudrun_subnet_cidr = "10.8.0.0/28" # cloud run must be in /28 CIDR
  cloudrun_service_account = "carelybay-cloudrun-sa"
  secret_names = {
    mongodb-url = "mongodb-url"
  }
  secret_values = {
    mongodb-url = "mongodb://host.docker.internal:27017/carelybay"
  }
}

# Modules
module "gcr" {
  source = "./modules/gcr"
  project_id     = var.project_id
  region = var.region
  repository_name = "carelybay-app"
}


module "secrets" {
  source     = "./modules/secret-manager"
  project_id = var.project_id
  secret_names = local.secret_names
  secret_values = local.secret_values
  cloudrun_service_account = "${local.cloudrun_service_account}@${var.project_id}.iam.gserviceaccount.com"
}

module "cloud_run" {
  source = "./modules/cloudrun"

  project_id           = var.project_id
  region               = var.region
  service_name         = "carelybay-frontend"
  image_url            = "${module.gcr.repository_url}/carelybay-frontend:latest" # push manually for now
  create_service_account     = true
  service_account_id         = local.cloudrun_service_account
  environment_variable_keys   = keys(local.secret_names)
  create_vpc_connector  = true
  vpc_connector_name    = "carelybay-connector"
  vpc_network          = local.vpc_network_name
  vpc_connector_subnet  = local.cloudrun_subnet
  vpc_access_egress    = "all-traffic"

  depends_on = [module.vpc, module.gcr]
}

module "vpc" {
  source = "./modules/vpc"

  project_id = var.project_id
  region     = var.region
  network_name = local.vpc_network_name
  subnets = {
  "backend-subnet" = {
    ip_cidr_range = local.app_subnet_cidr
    region        = var.region
  }
  "cloudrun-subnet" = {
    ip_cidr_range = local.cloudrun_subnet_cidr
    region        = var.region
  }
  }
  # subnet_name  = local.vpc_subnet_name
  # subnet_cidr_range = var.subnet_cidr_range
}