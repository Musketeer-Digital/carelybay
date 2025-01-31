# Enable Secret Manager API
resource "google_project_service" "secretmanager" {
  service = "secretmanager.googleapis.com"
  project = var.project_id

  disable_on_destroy = false
}

# Create secrets in Secret Manager
resource "google_secret_manager_secret" "secrets" {
  for_each = var.secret_names

  secret_id = each.key
  project   = var.project_id

  replication {
    auto {}
  }

  depends_on = [google_project_service.secretmanager]
}

resource "google_secret_manager_secret_version" "versions" {
  for_each = var.secret_names

  secret      = google_secret_manager_secret.secrets[each.key].id
  secret_data = var.secret_values[each.key] # Reference sensitive values indirectly

  depends_on = [google_secret_manager_secret.secrets]
}

# Grant access to the Cloud Run service account
resource "google_secret_manager_secret_iam_member" "secret_access" {
  for_each = var.secret_names

  project   = var.project_id
  secret_id = google_secret_manager_secret.secrets[each.key].secret_id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${var.cloudrun_service_account}"
}