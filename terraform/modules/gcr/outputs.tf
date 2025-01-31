output "repository_url" {
  description = "URL of the created container repository"
  value       = "${var.region}-docker.pkg.dev/${var.project_id}/${google_artifact_registry_repository.repo.repository_id}"
}

output "repository_name" {
  description = "Name of the created container repository"
  value       = google_artifact_registry_repository.repo.repository_id
}