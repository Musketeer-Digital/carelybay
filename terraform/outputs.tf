# GCR
output "repository_url" {
  description = "URL of the created container repository"
  value       = module.gcr.repository_url
}

output "cloudrun_nat_addr" {
  description = "NAT IP to whitelist"
  value       = module.vpc.nat_ips
}

output "cloudrun_service_url" {
  description = "Cloudrun service URL"
  value       = module.cloud_run.service_url
}