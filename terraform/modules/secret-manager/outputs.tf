output "secret_ids" {
  description = "Map of secret IDs created in Secret Manager"
  value       = { for k, v in google_secret_manager_secret.secrets : k => v.id }
}

output "secret_names" {
  description = "Map of secret names created in Secret Manager"
  value       = { for k, v in google_secret_manager_secret.secrets : k => v.secret_id }
}