
resource "google_project_service" "registry_apis" {
  count = length(var.registry_apis)
  project = var.project_id
  service = var.registry_apis[count.index]

  disable_dependent_services = false
  disable_on_destroy         = false
}

# Create Artifact Registry Repository
resource "google_artifact_registry_repository" "repo" {
  project       = var.project_id
  location      = var.region
  repository_id = var.repository_name
  description   = "Docker repository for project containers"
  format        = "DOCKER"

  depends_on = [google_project_service.registry_apis]
}