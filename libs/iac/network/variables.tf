variable "region" {
    type = string
}

variable "vpc_cidr" {
    type = string
    description = "Regional VPC IPv4 CIDR."
}

variable "public_subnet_cidrs" {
    type = list
    default = []
}

variable "private_subnet_cidrs" {
    type = list
    default = []
}

variable "root" {
    type = string
    description = "The root prefix name part that all tag Name's will begin with."
}