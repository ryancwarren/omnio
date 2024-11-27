provider "aws" {
    region = "ca-central-1"
}


data "aws_availability_zones" "available" {
  state = "available"
}

locals {
    azs = data.aws_availability_zones.available.names
    az_count = length(data.aws_availability_zones.available.names)
    vpc_cidr = "10.0.0.0/16"
    public_subnet_count = local.az_count
    private_subnet_count = local.az_count
    min_subnet_host_count = pow(2,8) - 1
    required_subnet_bits = ceil(
        log(local.public_subnet_count + local.private_subnet_count, 2)
    )
    public_subnets = [for i in range(0, local.public_subnet_count): 
        cidrsubnet(local.vpc_cidr, local.required_subnet_bits, i)]
    private_subnets = [for i in range(local.public_subnet_count, local.public_subnet_count + local.private_subnet_count): 
        cidrsubnet(local.vpc_cidr, local.required_subnet_bits, i)]

}

output "debug" {
    value = [
        local.az_count,
        ceil(log(6, 2)),
        local.public_subnets,
        local.private_subnets,
        local.public_subnets[0],
        cidrhost(local.public_subnets[0], pow(2,32-(16+local.required_subnet_bits))-1)
    ]
}
