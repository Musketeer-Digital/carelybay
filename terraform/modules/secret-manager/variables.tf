variable "project_id" {
  description = "The GCP project ID"
  type        = string
}

variable "cloudrun_service_account" {
  description = "The service account email for Cloud Run"
  type        = string
}

variable "secret_names" {
  description = "A map of secret names (non-sensitive)"
  type        = map(string)
}

variable "secret_values" {
  description = "A map of secret values (sensitive)"
  type        = map(string)
  sensitive   = true
}