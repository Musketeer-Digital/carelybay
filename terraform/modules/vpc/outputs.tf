# modules/vpc/outputs.tf
output "network_self_link" {
  value = google_compute_network.main.self_link
}

# output "subnet_self_link" {
#   value = google_compute_subnetwork.subnets.self_link
# }