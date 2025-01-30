# GCR
output "repository_url" {
  description = "URL of the created container repository"
  value       = module.gcr.repository_url
}

output "repository_name" {
  description = "Name of the created container repository"
  value       = module.gcr.repository_name
}