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

variable "image_tag" {
  description = "The 7-char SHA hash used for the Docker tag"
  type        = string
}

variable "domain_name" {
  description = "Domain name to point to the IP of our hosted DigitalOcean droplet"
  type        = string
  default     = "snek.echosec.io"
}

variable "floating_ip" {
  description = "A static IP address to point to our DigitalOcean droplet"
  type        = string
  default     = "167.99.25.113"
}

variable "ssh_key_ids" {
  description = "A list of SSH key IDs from DigitalOcean to allow SSH access to a droplet"
  type        = list(string)
  default     = [
    25059594 # brandonb@echosec.net
  ]
}

variable "papertrail_url" {
  description = "The URL of the Papertrail syslog location"
  type        = string
}
