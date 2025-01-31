# Cloud Run service
resource "google_service_account" "service_account" {
  count        = var.create_service_account ? 1 : 0
  account_id   = var.service_account_id
  display_name = var.service_account_display_name
  description  = var.service_account_description
  project      = var.project_id
}

# Service Account IAM roles
resource "google_project_iam_member" "service_account_roles" {
  for_each = var.create_service_account ? toset(var.service_account_roles) : []
  project  = var.project_id
  role     = each.value
  member   = "serviceAccount:${google_service_account.service_account[0].email}"
}

resource "google_cloud_run_service" "service" {
  name     = var.service_name
  location = var.region
  project  = var.project_id

  template {
    spec {
      containers {
        image = var.image_url
        resources {
          limits = {
            cpu    = var.cpu
            memory = var.memory
          }
        }

        dynamic "env" {
          for_each = var.environment_variable_keys
          content {
            name = env.value
            value_from {
              secret_key_ref {
                name = "${env.value}"
                key  = "latest"
              }
            }
          }
        }
      }

      service_account_name = google_service_account.service_account[0].email
      container_concurrency = var.container_concurrency
    }

    metadata {
      annotations = merge(
        {
          "autoscaling.knative.dev/maxScale" = var.max_instances
          "autoscaling.knative.dev/minScale" = var.min_instances
        },
        var.create_vpc_connector ? {
          "run.googleapis.com/vpc-access-connector" = google_vpc_access_connector.connector[0].name
          "run.googleapis.com/vpc-access-egress"    = var.vpc_access_egress
        } : {},
      )
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }

  autogenerate_revision_name = true
  depends_on = [
    google_service_account.service_account
  ]
}

# IAM policy for Cloud Run service
resource "google_cloud_run_service_iam_binding" "service" {
  count    = length(var.invokers) > 0 ? 1 : 0
  location = google_cloud_run_service.service.location
  project  = google_cloud_run_service.service.project
  service  = google_cloud_run_service.service.name
  role     = "roles/run.invoker"
  members  = var.invokers
}

# VPC Connector (optional)
resource "google_vpc_access_connector" "connector" {
  count         = var.create_vpc_connector ? 1 : 0
  name          = var.vpc_connector_name
  subnet {
    name = var.vpc_connector_subnet
  }
#   network       = var.vpc_network
  machine_type = "e2-micro"
  min_instances = 2
  max_instances = 3

  depends_on = [
    google_project_service.vpcaccess_api
  ]
}

# Enable required APIs
resource "google_project_service" "run_api" {
  project = var.project_id
  service = "run.googleapis.com"

  disable_on_destroy = false
}

resource "google_project_service" "vpcaccess_api" {
  project = var.project_id
  service = "vpcaccess.googleapis.com"

  disable_on_destroy = false
}