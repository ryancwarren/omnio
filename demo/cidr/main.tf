#
# A CIDR has the following reserved IPv4s,
#   1. The Network Identifier (the first IP).
#   2. The Broadcast Address, (the last host IP in a network).
#
# So if you have a network of 10.0.0.0/30 how many subnets can you
#   create?
#   
# You just have 2-bits of available space, with a size of 2^2 so 4 total.
# 
# We know that each subnet requires at least 2 reserved IPs.
#
# So a 10.0.0.0/31 CIDR subnet then needs,
#   1. Network IP/ID of 10.0.0.2
#   2. Broadcast IP of 10.0.0.3

# 63 decimal is 0011 1111 in binary, which when using cidrsubnet,
#   means to take 63 decimal-worth of bits of the parent-network's host space
#   as the network number?


# IPv4 octets, 2^8 = 256, [0, 1, ..., 255] = A, |A| = 256.
# 
# CIDR (Classless Inter Domain Routing) allows you to use variable length subnet masks
#   for making routing decisions.  Differs from the class-oriented, A,B,C,D style.
# 
# CIDR Format is, <IP Addr>/<Prefix Length>
#
# "Subnetting" refers to the process of,
#   1. Determing a host-IP in the current network CIDR that will represent 
#       a new subnet.
#   2. For the new subnet, determining the number of available hosts.
#   3. Determing the range of IP addresses.
#   4. Ensuring space for the reserved IP addresses.
#   5. Ensuring space for the optional default-gateway addr.
#
# The Network ID or IP is not assignable to any one device.  
#
# Internet scoped, public-IPs are of the form x.x.x.x/32.  CIDRs are concerned
#   with assisting with routing traffic.
#
# The 0.0.0.0/0 CIDR mean's ANY address.  It isn't routable.


output "debug" {
    value = [
        pow(2,8),
        slice([for i in range(0, 256): cidrhost("0.0.0.0/24", i)], 0, 2),
        cidrhost("255.255.255.255/24", 0),  // default gtw IP.
        cidrhost("255.255.255.255/24", 1),  // first host...
        cidrhost("255.255.255.255/24", pow(2, 8) - 1),
        cidrnetmask("255.255.255.255/24"),  // 255.255.255.0 is the Network ID (not an IP, non-assignable!).
        cidrhost("255.255.255.255/8", pow(2,0)),
        cidrhost("255.255.255.255/8", pow(2,8) - 1),
        cidrnetmask("255.255.255.255/8"),
        cidrnetmask("255.0.0.0/1"), # Less confusingly written as...
        cidrnetmask("${tostring(pow(2,8) - pow(2,7))}.0.0.0/1"), # No bitmask or shifting operators in terraform.
    ]
}

# When you are managing a network, you have 