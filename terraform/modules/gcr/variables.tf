
variable "project_id" {
  description = "The Google Cloud Project ID"
  type        = string
}

variable "region" {
  description = "The GCP region for resources"
  type        = string
  default     = "australia-southeast1"
}

variable "repository_name" {
  description = "Name of the container registry repository"
  type        = string
}

variable "registry_apis" {
    type = list(string)
    default = [
        "containerregistry.googleapis.com",
        "artifactregistry.googleapis.com"
    ]
}