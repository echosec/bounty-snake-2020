variable "api_token" {
  description = "DigitalOcean API personal access token"
  type        = string
}

variable "github_username" {
  description = "GitHub API username to login to the registry as"
  type        = string
}

variable "github_token" {
  description = "GitHub personal access token to login to registry with"
  type        = string
}

variable "domain_name" {
  description = "Domain name to point to the IP of our hosted DigitalOcean droplet"
  type        = string
  default     = "snek.echosec.net"
}