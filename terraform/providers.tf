terraform {
    backend "gcs" {
      bucket = "musketeer-terraform-state-zrla" # setup manually to avoid destroy mistake
      prefix  = "terraform/infra"
    }
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 6.10.0"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
  zone    = var.zone
}