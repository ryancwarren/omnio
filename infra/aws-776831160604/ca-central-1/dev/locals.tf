data "aws_availability_zones" "available" {
  state = "available"
}

locals {
    domain = "omnio.dev"
    name = "dev"
    region = "ca-central-1"
    cidr = "10.0.0.0/16"

    subnets = {
        public = {
            cidrs = [
                for i in range(0, length(data.aws_availability_zones.available.names)):
                    cidrsubnet(local.cidr,
                        ceil(log(length(data.aws_availability_zones.available.names)*2, 2)),
                        i
                    )
            ]
        },
        private = {
            cidrs = [
                for i in range(0, length(data.aws_availability_zones.available.names)):
                    cidrsubnet(local.cidr,
                        ceil(log(length(data.aws_availability_zones.available.names)*2, 2)),
                        length(data.aws_availability_zones.available.names)+i
                    )
            ]
        }
    }
}


output "debug" {
    value = [
        local.subnets
    ]
}