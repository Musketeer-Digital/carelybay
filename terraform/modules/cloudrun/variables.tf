variable "project_id" {
  description = "The project ID to deploy to"
  type        = string
}

variable "region" {
  description = "The region to deploy to"
  type        = string
}

variable "service_name" {
  description = "The name of the Cloud Run service"
  type        = string
}

variable "image_url" {
  description = "The URL of the container image"
  type        = string
}

variable "environment_variables" {
  description = "Environment variables to set"
  type        = map(string)
  default     = {}
}

variable "cpu" {
  description = "CPU quota (e.g., '1000m')"
  type        = string
  default     = "1000m"
}

variable "memory" {
  description = "Memory quota (e.g., '256Mi')"
  type        = string
  default     = "256Mi"
}

variable "container_concurrency" {
  description = "Maximum number of concurrent requests per container"
  type        = number
  default     = 80
}

variable "min_instances" {
  description = "Minimum number of instances"
  type        = number
  default     = 0
}

variable "max_instances" {
  description = "Maximum number of instances"
  type        = number
  default     = 100
}

variable "invokers" {
  description = "IAM members to grant invoker role"
  type        = list(string)
  default     = []
}

variable "vpc_connector" {
  description = "Name of the VPC connector"
  type        = string
  default     = null
}

variable "vpc_access_egress" {
  description = "VPC egress setting (all-traffic or private-ranges-only)"
  type        = string
  default     = "private-ranges-only"
}

variable "create_vpc_connector" {
  description = "Whether to create a VPC connector"
  type        = bool
  default     = false
}

variable "vpc_connector_name" {
  description = "Name of the VPC connector to create"
  type        = string
  default     = "vpc-connector"
}

variable "vpc_network" {
  description = "Name of the VPC network"
  type        = string
  default     = "default"
}

variable "vpc_connector_subnet" {
  description = "Subnet CIDR range for the VPC connector"
  type        = string
  default     = "10.8.0.0/28"
}

variable "vpc_connector_machine_type" {
  description = "Machine type for VPC connector"
  type        = string
  default     = "e2-micro"
}

variable "create_service_account" {
  description = "Whether to create a service account"
  type        = bool
  default     = true
}

variable "service_account_id" {
  description = "ID of the service account to create"
  type        = string
  default     = null
}

variable "service_account_display_name" {
  description = "Display name of the service account"
  type        = string
  default     = "Cloud Run Service Account"
}

variable "service_account_description" {
  description = "Description of the service account"
  type        = string
  default     = "Service account for Cloud Run service"
}

variable "service_account_roles" {
  description = "List of IAM roles to assign to the service account"
  type        = list(string)
  default     = [
    "roles/logging.logWriter",
    "roles/monitoring.metricWriter",
    "roles/monitoring.viewer",
    "roles/cloudtrace.agent",
    "roles/secretmanager.secretAccessor"
  ]
}

variable "service_account_email" {
  description = "The service account email to run the service as (used if create_service_account is false)"
  type        = string
  default     = null
}

variable "environment_variable_keys" {
  description = "List of non-sensitive keys for environment variables (used for iteration)"
  type        = list(string)
}