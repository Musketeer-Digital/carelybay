resource "google_project_service" "compute" {
  service = "compute.googleapis.com"
  project = var.project_id

  disable_on_destroy = false
}

resource "google_compute_network" "main" {
  name                    = var.network_name
  auto_create_subnetworks = false
}



# Create multiple subnets using dynamic block
resource "google_compute_subnetwork" "subnets" {
  for_each      = var.subnets
  name          = each.key
  ip_cidr_range = each.value.ip_cidr_range
  region        = each.value.region
  network       = google_compute_network.main.id
  project       = var.project_id

  dynamic "secondary_ip_range" {
    for_each = each.value.secondary_ranges != null ? flatten([
      for range_name, cidrs in each.value.secondary_ranges : [
        for cidr in cidrs : {
          range_name    = cidr.range_name
          ip_cidr_range = cidr.ip_cidr_range
        }
      ]
    ]) : []

    content {
      range_name    = secondary_ip_range.value.range_name
      ip_cidr_range = secondary_ip_range.value.ip_cidr_range
    }
  }
}

# Create NAT router for internet access
resource "google_compute_router" "nat_router" {
 name    = "${var.network_name}-nat-router"
 region  = var.region
 network = google_compute_network.main.name
}

resource "google_compute_address" "nat_addr" {
  name   = "nat-address"
  region = var.region
}

resource "google_compute_router_nat" "nat_gateway" {
 name                               = "${var.network_name}-nat-gateway"
 router                             = google_compute_router.nat_router.name
 region                             = var.region
 nat_ip_allocate_option             = "MANUAL_ONLY"
 nat_ips                = [google_compute_address.nat_addr.self_link]
 source_subnetwork_ip_ranges_to_nat = "ALL_SUBNETWORKS_ALL_IP_RANGES"

 log_config {
   enable = true
   filter = "ERRORS_ONLY"
 }
}

data  "google_compute_address" "nat_addr" {
  name = "nat-address"
  depends_on = [google_compute_address.nat_addr]
}