# variables.tf
variable "project_id" {
  description = "GCP Project ID"
  type        = string
}

variable "region" {
  description = "GCP Region"
  type        = string
  default     = "australia-southeast1"
}

variable "zone" {
  description = "GCP Zone"
  type        = string
  default     = "australia-southeast1-a"
}

variable "subnet_cidr_range" {
    description = "VPC Subnet CIDR range"
    type = string
    default = "10.0.0.0/24"
}