# modules/vpc/outputs.tf
output "network_self_link" {
  value = google_compute_network.main.self_link
}

output "nat_ips" {
  value = data.google_compute_address.nat_addr.address
}