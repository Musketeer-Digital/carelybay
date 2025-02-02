output "service_url" {
  description = "The URL of the deployed service"
  value       = google_cloud_run_service.service.status[0].url
}

output "service_name" {
  description = "Name of the deployed service"
  value       = google_cloud_run_service.service.name
}

output "service_location" {
  description = "Location of the deployed service"
  value       = google_cloud_run_service.service.location
}

output "vpc_connector_id" {
  description = "ID of the created VPC connector"
  value       = try(google_vpc_access_connector.connector[0].id, null)
}

output "latest_revision_name" {
  description = "Name of the latest revision"
  value       = google_cloud_run_service.service.status[0].latest_created_revision_name
}

output "service_identity" {
  description = "The identity that will be used for executing the service"
  value       = google_cloud_run_service.service.template[0].spec[0].service_account_name
}

output "service_account_email" {
  description = "Email of the service account"
  value       = var.create_service_account ? google_service_account.service_account[0].email : var.service_account_email
}

output "service_account_id" {
  description = "ID of the service account"
  value       = var.create_service_account ? google_service_account.service_account[0].id : null
}

output "service_account_name" {
  description = "Fully-qualified name of the service account"
  value       = var.create_service_account ? google_service_account.service_account[0].name : null
}