variable "project_id" {}
variable "region" {}
variable "network_name" {}
# variable "subnet_name" {}
# Define subnets using a map variable
variable "subnets" {
  description = "Map of subnet names to configuration"
  type = map(object({
    ip_cidr_range = string
    region        = string
    secondary_ranges = optional(map(list(object({
      range_name    = string
      ip_cidr_range = string
    }))), {})
  }))
}